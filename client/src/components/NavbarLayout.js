import React from 'react';
import Navbar from './Navbar';

const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">{children}</div>
    </>
  );
};

export default NavbarLayout;
