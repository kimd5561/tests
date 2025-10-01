<?php

// File containing all connection information
$env = parse_ini_file("./config.ini");

/**
 * Connects to the database specified by the credentials in "./config.ini"
 * 
 * @param array $env An array containing the parsed contents of "./config.ini"
 * 
 * @return mysqli The mysqli object created by mysqli() on success
 */
function connect_to_database($env) {

    $db_host = (string)$env["DB_HOST"];
    $db_user = (string)$env["DB_USER"];
    $db_pass = (string)$env["DB_PASS"];
    $db_name = (string)$env["DB_NAME"];

    // Create a new connection to the database
    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

    // Check if we connected to the database successfully
    if($mysqli->connect_error) {
        die("Error connecting to database: " . $mysqli->connect_error);
    }
    
    return $mysqli;
}
?>