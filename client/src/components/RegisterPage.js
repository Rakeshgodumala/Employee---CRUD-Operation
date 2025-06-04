import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = (props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    type: '',
    dob: '',
    image: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f8f9fa' }}>        <h3 className="text-center mb-3">Register</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              maxLength="50"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              maxLength="50"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              maxLength="20"
              required
            />
          </div>

          <div className="mb-3">
            <label>Role:</label><br />
            <input type="radio" name="role" value="admin" onChange={handleChange} required /> Admin
            <input type="radio" name="role" value="employee" onChange={handleChange} className="ms-3" /> Employee
          </div>

          <div className="mb-3">
            <label>Type:</label>
            <select
              name="type"
              className="form-control"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select role type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={form.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="mb-3">
            <label>Select Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">

            {props?.isRegister ? "Register" : "Add Employee"}</button>
        </form>
        {props?.isRegister && <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
        }
      </div>
    </div>
  );
};

export default RegisterPage;
