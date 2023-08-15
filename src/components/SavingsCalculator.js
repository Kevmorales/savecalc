import React, { useState, useEffect } from 'react';
import './SavingsCalculator.css';

function SavingsCalculator() {
    // Sparade räntor
    const [rates, setRates] = useState([]); 
    // Initial insättning
    const [deposit, setDeposit] = useState(0);
    // Antal år att spara
    const [years, setYears] = useState(1);
    // Sparande med ränta
    const [result, setResult] = useState(null);

    // När komponenten laddas, hämta räntor
    useEffect(() => {
        fetch("https://developer.sbab.se/sandbox/api/interest-rates/2.1/deposit-rates")
        .then(response => response.json())
        .then(data => {
            // hämta räntor från det mottagna datat
            const extractedRates = data.deposit_rates.map(item => item.deposit_rate_components[0].deposit_rate);
            setRates(extractedRates);
        });
    }, []);

    const handleCalculate = () => {
        // Använd den första räntesatsen för att beräkna
        const interestRate = rates[0]; 
        const calculatedValue = deposit * (1 + interestRate/100) ** years;
        setResult(calculatedValue);
    }

    return (
        <div className="calculator-container">
            <h1>SBAB Sparande Kalkylator</h1>
            <div className="input-section">
                <label>
                    Initial Insättning (SEK):
                    <input type="number" value={deposit} onChange={(e) => setDeposit(parseFloat(e.target.value))} />
                </label>
                <label>
                    Antal År:
                    <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))} />
                </label>
                <button onClick={handleCalculate}>Beräkna Sparande</button>
            </div>
            <div className="result-section">
                {result && <p>Ditt sparande efter {years} år: {result.toFixed(2)} SEK</p>}
            </div>
            <div className="rates-section">
                <h2>Räntesatser:</h2>
                {rates.map((rate, index) => (
                    <p key={index}>Ränta {index + 1}: {rate}%</p>
                ))}
            </div>
        </div>
    );
}

export default SavingsCalculator;
