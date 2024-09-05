import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!values.email || !values.password) {
      setError('Both email and password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8081/login', values);

      if (res.data.Status === "Success") {
        // Store the user's name in localStorage
        localStorage.setItem('userName', res.data.userName); // Assuming 'userName' is part of the response
        navigate('/home'); // Redirect to home page after successful login
      } else {
        setError(res.data.Error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred while communicating with the server');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-8 col-12 bg-white p-4 p-md-5 mx-auto rounded shadow">
            <h2 className="text-dark mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="signin-form">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="person@gmail.com"
                  value={values.email}
                  onChange={e => setValues({ ...values, email: e.target.value })}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="*********"
                  value={values.password}
                  onChange={e => setValues({ ...values, password: e.target.value })}
                  autoComplete="current-password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Login</button>
              <p className="text-dark text-center mt-3">Terms and Conditions Apply</p>
              <Link to="/register" className="btn btn-outline-dark w-100 mt-2">Sign Up</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
