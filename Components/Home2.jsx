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

    const [isDarkMode, setIsDarkMode] = useState(false); // Ajout de l'état pour le mode sombre

    // État pour signaler les déchets
    const [reportingData, setReportingData] = useState({ description: '', location: { lat: '', lng: '' } });
    const [reportedPoint, setReportedPoint] = useState(null);
    const [showReportForm, setShowReportForm] = useState(true);

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
        });
        alert('Merci pour votre signalement!');
        setShowReportForm(false);
        setReportingData({ description: '', location: { lat: '', lng: '' } });
    };

    // Basculer entre les modes clair et sombre
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    return (
        <div>
            <header>
                <div className="header-left">
                    <h1>Carte Interactive du 16ème Arrondissement de Paris</h1>
                </div>
                <div className="header-right">
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
                    </button>
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

        <div className='regroup-side-map'>

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

        </div>

                {/* Formulaire de signalement */}
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
                        <button type="submit">Signaler</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
