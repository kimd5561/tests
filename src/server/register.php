<?php
require "./index.php";

header("Access-Control-Allow-Origin: https://aptitude.cse.buffalo.edu");
header('Content-Type: application/json');


function element_in_database($connection, $field, $value) {
    $statement = $connection->prepare("SELECT id FROM Users WHERE $field = ? LIMIT 1");
    if(!$statement) {
        die("Error preparing SQL statement: " . $connection->error);
    }

    $statement->bind_param("s", $value);
    if(!$statement->execute()) {
        die("Error executing SQL query");
    }

    $result = $statement->get_result();
    if(!$result) {
        die("Error getting result");
    }

    if($result->num_rows > 0) {
        return true;
    }

    return false;
}


$errors = [];
$required_fields = [
    'first_name'    => 'First Name',
    'last_name'     => 'Last Name',
    'username'      => 'Username',
    'email'         => 'Email',
    'password_one'  => 'Password',
    'password_two'  => 'Confirmation Password'
];

$min_length = [
    'first_name'    => 2,
    'last_name'     => 2,
    'username'      => 3,
    'email'         => 5,
    'password_one'  => 8,
    'password_two'  => 8
];

$max_length = [
    'first_name'    => 20,
    'last_name'     => 20,
    'username'      => 20,
    'email'         => 50,
    'password_one'  => 64,
    'password_two'  => 64
];

$field_regex = [
    'first_name'    => '/^[a-zA-Z]+$/',
    'last_name'     => '/^[a-zA-Z]+$/',
    'username'      => '/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/',
    'email'         => '/^[^\s@]+@[^\s@]+\.[^\s@]+$/',
    'password_one'  => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/',
    'password_two'  => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/'
];

$valid_contents = [
    'first_name'    => "Must contain only letters",
    'last_name'     => "Must contain only letters",
    'username'      => "Must start with a letter; letters, numbers, _ or - only",
    'email'         => "Invalid email address",
    'password_one'  => "Include upper and lowercase letter, number and symbol",
    'password_two'  => "Include upper and lowercase letter, number and symbol"
];

try {

    $post_data = json_decode(file_get_contents("php://input"), true);

    // Ensure POST request has data
    if(empty($post_data)) {
        throw new Exception("No POST data", 400);
    }

    // Ensure no input fields are missing or empty
    foreach ($required_fields as $field => $name) {
        if(!isset($post_data[$field]) || empty($post_data[$field])) {
            $errors[$field] = "'$name' is required";
            throw new Exception("Missing input data", 400);
        }
    }

    // Ensure that all input data follows correct formatting
    $clean_values = [];
    foreach ($required_fields as $field => $name) {
        $clean_value = htmlspecialchars(trim($post_data[$field]));
        $str_len = strlen($clean_value);
        if($str_len < $min_length[$field]) {
            $min = $min_length[$field];
            $errors[$field] = "Must be at least '$min' characters";
            throw new Exception("Input too small", 400);
        } else if ($str_len > $max_length[$field]) {
            $max = $max_length[$field];
            $errors[$field] = "Must be at most '$max' characters";
            throw new Exception("Input too long", 400);
        } else if (!preg_match($field_regex[$field], $clean_value)) {
            $contents = $valid_contents[$field];
            $errors[$field] = "'$contents'";
            throw new Exception("Invalid input", 400);
        }

        // Add the current value to $clean_values if it is in fact clean
        $clean_values[$field] = $clean_value;
    }



    // Ensure the password and confirmation password match
    if($clean_values['password_one'] !== $clean_values['password_two']) {
        $errors['password_one'] = "Passwords do not match";
        throw new Exception("Passwords do not match", 400);
    }

    // Hash and salt password
    $password_hash = password_hash($clean_values['password_one'], PASSWORD_DEFAULT);



    // Create a new connection to the database
    $connection = connect_to_database($env);

    // Ensure we don't already have the same username in our database
    if(element_in_database($connection, 'username', $clean_values['username'])) {
        $errors['username'] = "Username already exists";
        throw new Exception("Username already exists", 400);
    }


    // Ensure we don't already have the same email in our database
    if(element_in_database($connection, 'email', $clean_values['email'])) {
        $errors['email'] = "Email already exists";
        throw new Exception("Email already exists", 400);
    }


    // We have clean data!!!!
    $sql = "INSERT INTO Users (first_name, last_name, username, email, password_hash) VALUES (?, ?, ?, ?, ?)";



    $statement = $connection->prepare($sql);
    if(!$statement) {
        die("Error preparing SQL statement: " . $connection->error);
    }

    $statement->bind_param("sssss", $clean_values['first_name'], $clean_values['last_name'], 
                            $clean_values['username'], $clean_values['email'], $password_hash);

    
    if($statement->execute()) {
        $response_data = [
            'success' => true,
            'message' => 'User registered successfully'
        ];

        echo json_encode($response_data);
    } else {
        die('Error creating entry in database');
    }


    $statement->close();
    $connection->close();
} catch (Exception $e) {
    // Handle any errors caught by guard clauses
    $error_data = [
        'success' => false,
        'status' => 'error',
        'message' => $e->getMessage(),
        'errors' => $errors,
        'code' => $e->getCode()
    ];

    echo json_encode($error_data);
    exit();
}
?>