import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import custom CSS

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081') // Endpoint to check authentication
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name); // Ensure your backend is sending `name`
        } else {
          setAuth(false);
          setMessage(res.data.Error || "You are not logged in");
        }
      })
      .catch(err => {
        console.log(err);
        setMessage("An error occurred while checking authentication");
      });
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
      .then(() => {
        setAuth(false);
        setName('');
        navigate('/'); // Redirect to login page after logout
      })
      .catch(err => {
        console.log(err);
        setMessage("Logout failed");
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 fw-bold" href="/Home">EduLink</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a className="nav-link text-white fs-5 fw-bold" href="/About">About</a>
              </li>
              <li className="nav-item">
                <span className="navbar-text text-white fs-5 mx-3 fw-bold">Welcome, {name || 'Guest'}</span>
              </li>
              {auth && (
                <li className="nav-item">
                  <button className="btn btn-danger fs-5" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-secondary text-white text-center py-4">
        <div className="container">
          {auth ? (
            <h1 className="display-4">Welcome to EduLink, {name}!</h1>
          ) : (
            <h1 className="display-4">Welcome to EduLink!</h1>
          )}
          <p className="lead">Your go-to platform for sharing and discussing previous question papers.</p>
        </div>
      </header>

      <section className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Share Papers</h5>
                <p className="card-text">Upload your previous question papers to help fellow students.</p>
                <a href="/upload" className="btn btn-secondary">Upload Now</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Discuss Topics</h5>
                <p className="card-text">Join discussions on various subjects to enhance your knowledge.</p>
                <a href="/discuss" className="btn btn-secondary">Join Discussion</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p>&copy; 2024 EduLink. All rights reserved.</p>
          <p><a href="#" className="text-white">Privacy Policy</a> | <a href="#" className="text-white">Terms of Service</a></p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
