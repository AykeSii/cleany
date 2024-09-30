import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Home from "./Components/Home.jsx";
import Home2 from "./Components/Home2.jsx";
function App() {
    return (
        <Router>
            <main className='flex flex-col gap-5'>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Home2 />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
