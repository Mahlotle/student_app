import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    FName: '',
    LName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/login'); 
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark text-white vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10 col-12 bg-white p-4 p-md-5 mx-auto">
            <h2 className="text-dark mb-4 text-center">Sign Up</h2>

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="mb-3">
                <label htmlFor="f-name" className="form-label text-dark">First Name</label>
                <input 
                  type="text" 
                  id="f-name" 
                  className="form-control" 
                  placeholder="First Name..." 
                  name="FName" 
                  value={values.FName}
                  onChange={e => setValues({ ...values, FName: e.target.value })}
                  autoComplete="given-name" 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="l-name" className="form-label text-dark">Last Name</label>
                <input 
                  type="text" 
                  id="l-name" 
                  className="form-control" 
                  placeholder="Last Name..." 
                  name="LName"
                  value={values.LName}
                  onChange={e => setValues({ ...values, LName: e.target.value })}
                  autoComplete="family-name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="semail" className="form-label text-dark">Email</label>
                <input 
                  type="email" 
                  id="semail" 
                  className="form-control" 
                  placeholder="person@gmail.com..." 
                  name="email" 
                  value={values.email}
                  onChange={e => setValues({ ...values, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="spassword" className="form-label text-dark">Password</label>
                <input 
                  type="password" 
                  id="spassword" 
                  className="form-control" 
                  placeholder="*********" 
                  name="password" 
                  value={values.password}
                  onChange={e => setValues({ ...values, password: e.target.value })}
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn-dark w-100">Sign up</button>
              <p className='text-dark text-center'>Terms and Conditions Apply</p>
              <Link to="/" className="btn btn-dark w-100">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
