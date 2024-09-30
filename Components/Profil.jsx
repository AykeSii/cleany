import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import '../Css/Profil.css';
import logo from '../assets/logo2.png';

// Header Component
const Header = ({ toggleDarkMode, isDarkMode }) => {
    return (
        <header className={`header ${isDarkMode ? 'dark' : ''}`}>
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-image" /> {/* Updated logo */}
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button className="search-button">🔍</button>
            </div>
            <div className="user-options">
                <a href="/home"> <FaArrowLeft className="profile-icon"> </FaArrowLeft> </a>
                <button className="dark-mode-button" onClick={toggleDarkMode}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    );
};


// UserProfile Component
const UserProfile = ({ isDarkMode }) => {
    // Static data for demonstration purposes
    const reports = [
        { id: 1, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 2, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 3, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 4, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 5, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 6, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' }
    ];

    return (
        <div className={`profile-section ${isDarkMode ? 'dark' : ''}`}>
            <div className="profile-header">
                <div className="profile-picture">
                    <img src="https://i.imgur.com/rfehWBZ.png" alt="Profile" className="profile-avatar-img" />
                </div>
                <div className="profile-info">
                    <h2>John Brown</h2>
                    <p>he/him</p>
                </div>
            </div>
            <div className="profile-divider"></div> {/* Stylish line */}
            <div className="report-list">
                <h3>Tous vos signalements :</h3>
                <div className="reports">
                    {reports.map(report => (
                        <div className="report-item" key={report.id}>
                            <span className="report-icon">📢</span>
                            <div className="report-content">
                                <h4>{report.title}</h4>
                                <p>{report.description}</p>
                            </div>
                            <span className="report-time">{report.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Footer Component
const Footer = ({ isDarkMode }) => {
    return (
        <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
            <nav>
                <ul className="footer-links">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/">Actualité</a></li>
                    <li><a href="/">A Propos</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Mention Légales</a></li>
                    <li><a href="/">CGU</a></li>
                </ul>
            </nav>
        </footer>
    );
};

// Assembled ProfilePage Component
const ProfilePage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`profile-page ${isDarkMode ? 'dark' : ''}`}>
            <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <main>
                <UserProfile isDarkMode={isDarkMode} />
            </main>
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
};

export default ProfilePage;