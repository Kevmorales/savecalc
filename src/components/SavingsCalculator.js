import React, { useState, useEffect } from 'react';
import './SavingsCalculator.css';

// Här skapar vi vår huvudkomponent
function SavingsCalculator() {
    const [rates, setRates] = useState([]); // Denna state lagrar våra räntesatser

    // Denna funktion hämtar räntesatser från SBAB API
    useEffect(() => {
        fetch("https://developer.sbab.se/sandbox/api/interest-rates/2.1/deposit-rates")
        .then(response => response.json())
        .then(data => {
            setRates(data);
        });
    }, []);

    return (
        <div>
            <h2>SBAB Sparande Kalkylator</h2>
            {/* Vi kommer att behöva ett formulär här för att ta input från användaren och visa resultatet */}
        </div>
    );
}

export default SavingsCalculator;
