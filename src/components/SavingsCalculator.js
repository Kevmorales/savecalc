import React, { useState, useEffect } from 'react';

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
            {/* Här kommer vår kalkylator UI */}
        </div>
    );
}

export default SavingsCalculator;
