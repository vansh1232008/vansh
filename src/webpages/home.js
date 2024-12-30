import React from 'react';
import DataTabelVariable from './array';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #74ebd5, #9face6)', // Soft gradient
    color: '#1e293b', // Dark gray for text
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '800px',
    textAlign: 'center',
    margin: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>Smart Cash Flow Manager</h1>
        <p>
          Efficiently minimize cash transactions among friends. Enter the number
          of participants and the transaction data to calculate the optimized
          cash flow.
        </p>
        <DataTabelVariable />
        <button style={buttonStyle}>Calculate</button>
      </div>
    </div>
  );
};

export default Home;
