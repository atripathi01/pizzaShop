import React from 'react';
import './style.css';

// Define types for props
interface NavbarProps {
  title: string;
  children: React.ReactNode;
}

// Functional component with TypeScript
const Navbar: React.FC<NavbarProps> = ({ title , children}) => {
  return (
    <nav>
      <div className="navbar">
      <a href='/'>
      <div className="navbar-title">{title}a</div>
        </a> 
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
