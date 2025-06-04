import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EditEmployee from './components/EditEmployee';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NavbarLayout from './components/NavbarLayout'; // ✅ import it
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage isRegister={true} />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <NavbarLayout>
                    <Dashboard />
                  </NavbarLayout>
                </PrivateRoute>
              }
            />

             <Route
              path="/add"
              element={
                <PrivateRoute>
                  <NavbarLayout>
                    <RegisterPage  />
                  </NavbarLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <PrivateRoute requiredRole="admin">
                  <NavbarLayout>
                    <EditEmployee />
                  </NavbarLayout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
