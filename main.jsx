import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correct de ReactDOM
import App from './App'; // Assure-toi que tu importes correctement App

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("Element with id 'root' not found in the DOM.");
}
