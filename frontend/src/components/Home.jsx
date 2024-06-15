import React from 'react';
import backgroundImage from '../assets/book.jpg';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background
        padding: '20px',
        borderRadius: '10px'
      }}>
        <div style={{ 
          margin: '10px', 
          padding: '10px 20px', 
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}>
          Create your book collection
        </div>
        <button style={{ 
          margin: '10px', 
          padding: '20px 40px', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          backgroundColor: 'lightgreen',
          border: 'none',
          borderRadius: '5px'
        }}
        onClick={() => navigate('/user/login')}>
          LOGIN
        </button>
        <button style={{ 
          margin: '10px', 
          padding: '20px 40px', 
          fontSize: '24px', 
          fontWeight: 'bold', 
          backgroundColor: 'lightgreen',
          border: 'none',
          borderRadius: '5px'
        }}
        onClick={() => navigate('/user/signup')}>
          SIGNUP
        </button>
      </div>
    </div>
  );
};

export default Home;
