import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing React-icons for user profile icon
import '../Css/Profil.css'; // Assuming the CSS file is stored in the 'Css' folder

// Header Component
const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <span className="logo-icon">C</span>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button className="search-button">🔍</button>
            </div>
            <div className="user-options">
                <FaUserCircle className="profile-icon" />
                <button className="dark-mode-button">🌙</button>
            </div>
        </header>
    );
};

// UserProfile Component
const UserProfile = () => {
    // Static data for demonstration purposes
    const reports = [
        { id: 1, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 2, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 3, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' },
        { id: 4, title: 'Tag signalé', description: 'Graffiti "Skibidi" signalé 68 rue Gignac', time: 'la semaine dernière' }
    ];

    return (
        <div className="profile-section">
            <div className="profile-header">
                <FaUserCircle className="profile-avatar" />
                <h2>John Brown</h2>
                <p>he/him</p>
            </div>
            <div className="report-list">
                <h3>Tout vos signalement :</h3>
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
                <button className="view-more-button">Voir plus</button>
            </div>
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="footer">
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
            <p>&copy; 2024 - Carte interactive</p>
        </footer>
    );
};

// Assembled ProfilePage Component
const ProfilePage = () => {
    return (
        <div className="profile-page">
            <Header />
            <main>
                <UserProfile />
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
