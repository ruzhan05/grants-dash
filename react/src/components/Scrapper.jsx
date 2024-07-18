import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Topbar from '../scenes/global/Topbar'
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"

const Scrapper = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [totalGrants, setTotalGrants] = useState(0);
  const [grantsCount, setGrantsCount] = useState(0);
  const [GGgrantsCount, setGGGrantsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!token) {

      navigate("/login");
      alert("You need to login first")
    }

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.grantsCount) {
        setGrantsCount(data.grantsCount);
        setProgress((data.grantsCount / data.totalGrants) * 100);

      }
      if (data.GGgrantsCount) {
        setGGGrantsCount(data.GGgrantsCount);
      }
      if (data.message) {
        setMessage(data.message);
      }
      if (data.error) {
        console.error(data.error);
        alert('Error occurred during scraping. Check the console for more details.');
      }
    };
    const ws2 = new WebSocket('ws://localhost:8081');
    ws2.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.GGgrantsCount) {
        setGGGrantsCount(data.GGgrantsCount);
      }
      if (data.message) {
        setMessage(data.message);
      }
      if (data.error) {
        console.error(data.error);
        alert('Error occurred during scraping. Check the console for more details.');
      }



      return () => {
        ws.close();
        ws2.close();
      };
    }
  }, [token, navigate]);
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setAdmin(decodedToken.isAdmin);
    }
  }, [token]);


  const handleScrapeButtonClickGov = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/scrape');
      console.log(response.data);
      setLoading(false);
      alert('Scraping completed successfully!');
    } catch (error) {
      console.error('Error occurred during scraping:', error);
      setLoading(false)
      // alert('Error occurred during scraping. Check the console for more details.');
    }
  };

  const handleScrapeNIHonClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/scrapeNIH');
      console.log(response.status); //response.data chilo
      alert('Scraping completed. Check the backend console for updates.');
      setLoading(false);
    } catch (error) {
      console.error('Error occurred during scraping:', error);
      setLoading(false)
      // alert('Error occurred during scraping. Check the console for more details.'); ///eta ashtese
    }
  };
  // const handleHomeClick = () => {
  //   navigate('/');
  // };
  // const handleCreateUser = () => {
  //   navigate('/register')
  // }


  return (
    <>
      {admin ? (<div>
        <Topbar />

        <div className="page-container">
          <div className="grants-scraper">
            <h1>Grants Scraper</h1>
            <div className="button-container">
              <div className="button-group">
                <button onClick={handleScrapeButtonClickGov} className="scrape-button gov-button">
                  Scrape Grants Gov
                </button>
                <p className="grants-count">Grants processed: {GGgrantsCount}</p>
              </div>
              <div className="button-group">
                <button onClick={handleScrapeNIHonClick} className="scrape-button nih-button">
                  Scrape NIH
                </button>
                <p className="grants-count">Grants processed: {grantsCount}</p>
              </div>
            </div>
            <div className="message-container">
              <p>{message}</p>
              {loading && <div className="loading-spinner"></div>}
            </div>
          </div>
          <div className="button-group2">
            <Link to='/'>
              <button className="home-button">
                Go to Dashboard
              </button>
            </Link>

            <Link to='/register'>
              <button className="home-button">
                Create User
              </button>
            </Link>
          </div>

          <style jsx>{`
        .page-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f0f4f8;
        }
      
        .grants-scraper {
      width: 90%;
      max-width: 800px;
      padding: 30px;
      background-color: #ffffff;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      border: 1px solid #e1e8ed;
        }
      
        h1 {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      color: #2c3e50;
        }
      
        .button-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
        }
      
        .button-group {
      text-align: center;
        }
      
      
      .button-group2 {
      display: flex;
      justify-content: center;
      gap: 150px; /* This adds space between the buttons */
      margin-top: 20px;
        }
      
      
      
        .scrape-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: bold;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      
        .gov-button {
      background-color: #3498db;
        }
      
        .gov-button:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
        }
      
        .nih-button {
      background-color: #9b59b6;
        }
      
        .nih-button:hover {
      background-color: #8e44ad;
      transform: translateY(-2px);
        }
      
        
      
        .grants-count {
      margin-top: 15px;
      font-weight: bold;
      color: #34495e;
        }
      
        .message-container {
      text-align: center;
      margin-top: 20px;
      color: #7f8c8d;
        }
      
        .home-button {
      padding: 12px 24px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: bold;
      color: white;
      background-color: #2ecc71;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      
        .home-button:hover {
      background-color: #27ae60;
      transform: translateY(-2px);
        }
      
        .loading-spinner {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;
        }
      
        @keyframes spin {
      to { transform: rotate(360deg); }
        }
      
        @media (max-width: 600px) {
      .button-container {
        flex-direction: column;
        align-items: center;
      }
      .button-group {
        margin-bottom: 20px;
      }
        }
      `}</style>
        </div>
      </div>) : (<p>Access Denied</p>)}
    </>
  );
};

export default Scrapper;

