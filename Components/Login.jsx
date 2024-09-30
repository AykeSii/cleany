import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Register.css'; // Assure-toi que le chemin est correct

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [isHuman, setIsHuman] = useState(false); // État pour "Je ne suis pas un robot"
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification si le prénom, le nom et la case "Je ne suis pas un robot" sont remplis
        if (firstName && lastName && isHuman) {
            localStorage.setItem('user', JSON.stringify({ firstName, lastName }));
            navigate('/home'); // Redirection vers la page d'accueil
        } else if (!isHuman) {
            setError('Veuillez confirmer que vous n\'êtes pas un robot.');
        } else {
            setError('Veuillez saisir votre nom d\'utilisateur et votre mot de passe.');
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirection vers la page d'inscription
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-field">
                    <label>Nom d’utilisateur / Adresse mail:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <input
                        type="checkbox"
                        checked={isHuman}
                        onChange={() => setIsHuman(!isHuman)}
                    />
                    <label style={{ marginLeft: '10px' }}>Je ne suis pas un robot</label>
                </div>
                <button type="submit">Log In</button>
                <div className="signup-text">
                    <span>Pas encore de compte ? </span>
                    <a href="/signup" className="signup-link">S'inscrire</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
