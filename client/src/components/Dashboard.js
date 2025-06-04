
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [location.state?.refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">

        <div className="container mt-4">
          <div className="position-relative mb-3">
            <h3 className="text-center mb-0">All Users</h3>
            <input
              type="text"
              placeholder="Search by name or email"
              className="form-control w-auto position-absolute top-50 end-0 translate-middle-y"
              style={{ minWidth: '250px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Role</th>
                <th>Image</th>
                {user?.role == 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone || '-'}</td>
                    <td>{emp.dob || '-'}</td>
                    <td>{emp.role || '-'}</td>
                    <td>
                      {emp.image ? (
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${emp.image}`}
                          alt="emp"
                          width="50"
                          style={{ objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                    {user?.role == 'admin' &&
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => navigate(`/edit/${emp._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete
                        </button>
                      </td>
                    }
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center mt-auto py-3 bg-light">
        © 2025 Role-Based Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;

