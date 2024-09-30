import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Register.css'; // Assure-toi que le chemin est correct

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification basique si tous les champs sont remplis
        if (firstName && lastName && email && password) {
            const userData = {
                firstName,
                lastName,
                email,
                password,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/home'); // Redirection vers la page d'accueil après l'inscription
        } else {
            setError('Veuillez remplir tous les champs.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className='register'>
                <h2>Register</h2>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-field">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Entrez votre prénom"
                    />
                </div>
                <div className="form-field">
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Entrez votre nom"
                    />
                </div>
                <div className="form-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre adresse e-mail"
                    />
                </div>
                <div className="form-field">
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
