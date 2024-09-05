// src/pages/About.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'; // Import custom CSS for the About page

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 fw-bold" href="/home">EduLink</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
            
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-secondary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">About EduLink</h1>
          <p className="lead">Discover everything you need to know about our platform.</p>
        </div>
      </header>

      <section className="container mt-5">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm border-light">
              <div className="card-body">
                <h5 className="card-title">Our Mission</h5>
                <p className="card-text">
                  At EduLink, our mission is to provide students with an accessible and user-friendly platform for sharing and discussing previous question papers. We aim to foster a collaborative environment where students can support each other in their academic pursuits.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm border-light">
              <div className="card-body">
                <h5 className="card-title">Our Vision</h5>
                <p className="card-text">
                  We envision EduLink as a comprehensive resource hub that not only aids students in preparing for exams but also encourages a sense of community and shared learning. Our goal is to be the go-to platform for academic resources and discussions.
                </p>
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

export default About;
