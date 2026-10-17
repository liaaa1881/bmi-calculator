// src/components/Bmi.jsx
import { useState } from 'react';
import './Bmi.css';

const BmiCalculator = () => {
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const beratVal = parseFloat(berat);
    const tinggiVal = parseFloat(tinggi) / 100; // cm ke meter

    if (isNaN(beratVal) || isNaN(tinggiVal) || tinggiVal <= 0 || beratVal <= 0) {
      setHasil({ bmi: 0, status: 'Input nilai berat dan tinggi tidak valid!' });
      return;
    }

    const bmiVal = (beratVal / (tinggiVal * tinggiVal)).toFixed(1);
    let statusKategori = '';

    if (bmiVal < 18.5) {
      statusKategori = 'Kurang Berat Badan (Underweight)';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      statusKategori = 'Berat Badan Normal (Ideal)';
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      statusKategori = 'Kelebihan Berat Badan (Overweight)';
    } else {
      statusKategori = 'Obesitas';
    }

    setHasil({ bmi: bmiVal, status: statusKategori });
  };

  return (
    <div className="container">
      <h2>Kalkulator Kategori BMI</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Berat Badan (kg):
          <input
            type="number"
            className="input"
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            placeholder="Masukkan berat badan"
          />
        </label>

        <label className="label">
          Tinggi Badan (cm):
          <input
            type="number"
            className="input"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            placeholder="Masukkan tinggi badan"
          />
        </label>

        <button type="submit" className="button">Cek Kategori</button>
      </form>

      {hasil && (
        <div className="result">
          {hasil.bmi > 0 && <p><strong>Nilai BMI:</strong> {hasil.bmi}</p>}
          <p><strong>Status:</strong> {hasil.status}</p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;