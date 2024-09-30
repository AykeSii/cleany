import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import '../Css/Home.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Home = () => {
    const [showToilettes, setShowToilettes] = useState(false);
    const [showComposte, setShowComposte] = useState(false);
    const [showCollecte, setShowCollecte] = useState(false);
    const [toilettesData, setToilettesData] = useState([]);
    const [compostData, setCompostData] = useState([]);
    const [collecteData, setCollecteData] = useState([]);

    // État pour signaler les déchets
    const [reportingData, setReportingData] = useState({ description: '', location: { lat: '', lng: '' } });
    const [reportedPoint, setReportedPoint] = useState(null); // Nouvel état pour le point signalé
    const [showReportForm, setShowReportForm] = useState(true); // Toujours afficher le formulaire

    const navigate = useNavigate();

    // Fetch Toilettes data from the API
    useEffect(() => {
        if (showToilettes) {
            axios
                .get(
                    'https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&rows=100&facet=arrondissement&refine.arrondissement=75016'
                )
                .then((response) => {
                    setToilettesData(response.data.records);
                })
                .catch((error) =>
                    console.error('Error fetching toilettes data:', error)
                );
        }
    }, [showToilettes]);

    // Fetch Compost data
    useEffect(() => {
        if (showComposte) {
            axios
                .get(
                    'https://opendata.paris.fr/api/records/1.0/search/?dataset=dechets-menagers-points-dapport-volontaire-composteurs&rows=20&refine=code_postal%3A%2275016%22&refine=operateur%3A%22Association%20Aurore%22&refine=operateur%3A%22Association%20Espaces%22'
                )
                .then((response) => {
                    setCompostData(response.data.records);
                })
                .catch((error) =>
                    console.error('Error fetching compost data:', error)
                );
        }
    }, [showComposte]);

    // Fetch Collecte data
    useEffect(() => {
        if (showCollecte) {
            axios
                .get(
                    'https://opendata.paris.fr/api/records/1.0/search/?dataset=dechets-menagers-points-dapport-volontaire-recycleries-et-ressourceries&rows=20'
                )
                .then((response) => {
                    setCollecteData(response.data.records);
                })
                .catch((error) =>
                    console.error('Error fetching collecte data:', error)
                );
        }
    }, [showCollecte]);

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reported data:', reportingData);
        setReportedPoint({
            lat: parseFloat(reportingData.location.lat),
            lng: parseFloat(reportingData.location.lng),
        }); // Mettez à jour le point signalé avec les coordonnées
        alert('Merci pour votre signalement!');
        setShowReportForm(false); // Cacher le formulaire après soumission
        setReportingData({ description: '', location: { lat: '', lng: '' } });
    };

    return (
        <div>
            <header>
                <div className="header-left">
                    <h1>Carte Interactive du 16ème Arrondissement de Paris</h1>
                </div>
                <div className="header-right">
                    <button
                        className="login-button"
                        onClick={() => navigate('/login')}
                    >
                        Se connecter
                    </button>
                    <button
                        className="signup-button"
                        onClick={() => navigate('/register')}
                    >
                        S'inscrire
                    </button>
                </div>
            </header>

            <div className="sidebar">
                <h3>Que cherchez-vous ?</h3>
                <div className="options">
                    <input
                        type="checkbox"
                        id="toilettes"
                        onChange={() => setShowToilettes(!showToilettes)}
                    />
                    <label htmlFor="toilettes">Toilettes</label>
                    <br />
                    <input
                        type="checkbox"
                        id="composte"
                        onChange={() => setShowComposte(!showComposte)}
                    />
                    <label htmlFor="composte">Composte</label>
                    <br />
                    <input
                        type="checkbox"
                        id="collecte"
                        onChange={() => setShowCollecte(!showCollecte)}
                    />
                    <label htmlFor="collecte">Point de Collecte</label>
                    <br />
                </div>
            </div>

            <div className="content">
                <MapContainer
                    center={[48.8604, 2.273]}
                    zoom={14}
                    style={{ height: '450px', width: '80%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Toilettes markers */}
                    {showToilettes &&
                        Array.isArray(toilettesData) &&
                        toilettesData.map((toilette, index) => (
                            <Marker
                                key={index}
                                position={[
                                    toilette.fields.geo_point_2d[0],
                                    toilette.fields.geo_point_2d[1],
                                ]}
                            >
                                <Popup>{toilette.fields.nom_voie}</Popup>
                            </Marker>
                        ))}

                    {/* Compost markers */}
                    {showComposte &&
                        Array.isArray(compostData) &&
                        compostData.map((compost, index) => (
                            <Marker
                                key={index}
                                position={[
                                    compost.fields.geo_point_2d[0],
                                    compost.fields.geo_point_2d[1],
                                ]}
                            >
                                <Popup>Composte</Popup>
                            </Marker>
                        ))}

                    {/* Collecte points markers */}
                    {showCollecte &&
                        Array.isArray(collecteData) &&
                        collecteData.map((collect, index) => (
                            <Marker
                                key={index}
                                position={[
                                    collect.fields.geo_point_2d[0],
                                    collect.fields.geo_point_2d[1],
                                ]}
                            >
                                <Popup>Point de Collecte</Popup>
                            </Marker>
                        ))}

                    {/* Marker for the reported point */}
                    {reportedPoint && (
                        <Marker position={reportedPoint}>
                            <Popup>Signalement: {reportingData.description}</Popup>
                        </Marker>
                    )}
                </MapContainer>

                {/* Formulaire de signalement, affiché en permanence */}
                <div className="report-form">
                    <h3>Signaler un amas de déchets</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Description :</label>
                            <textarea
                                value={reportingData.description}
                                onChange={(e) =>
                                    setReportingData({ ...reportingData, description: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Latitude :</label>
                            <input
                                type="number"
                                value={reportingData.location.lat}
                                onChange={(e) =>
                                    setReportingData({ ...reportingData, location: { ...reportingData.location, lat: e.target.value } })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Longitude :</label>
                            <input
                                type="number"
                                value={reportingData.location.lng}
                                onChange={(e) =>
                                    setReportingData({ ...reportingData, location: { ...reportingData.location, lng: e.target.value } })
                                }
                                required
                            />
                        </div>
                        <button type="submit">Soumettre</button>
                        <button type="button" onClick={() => setShowReportForm(false)}>Annuler</button>
                    </form>
                </div>
            </div>

            <footer>
                <nav>
                    <ul className="footer-links">
                        <li><a href="/paris">Accueil</a></li>
                        <li><a href="/marseille">Actualité</a></li>
                        <li><a href="/bordeaux">A Propos</a></li>
                        <li><a href="/porto-vecchio">Contact</a></li>
                        <li><a href="/porto-vecchio">Mention Légales</a></li>
                        <li><a href="/porto-vecchio">CGU</a></li>
                    </ul>
                </nav>
                <p>&copy; 2024 - Carte interactive</p>
            </footer>
        </div>
    );
};

export default Home;
