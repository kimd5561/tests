import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/Home";
import ForgotPassword from "./pages/ForgotPassword/forgotPassword"; 
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register";

import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </Router>;
    </StrictMode>,
)