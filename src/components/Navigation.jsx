import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import image from '../assets/rent-cars-logo.webp';
import styles from './Navigation.module.css';

const navLinks = [
  { to: '/', label: 'Home', guest: true },
  { to: '/login', label: 'Login', guest: true },
  { to: '/register', label: 'Register', guest: true },
  { to: '/vehicles', label: 'Vehicles', auth: true },
  { to: '/new-reservation', label: 'Reserve', auth: true },
  { to: '/my-reservations', label: 'My reservations', auth: true },
  { to: '/new-vehicle', label: 'Add vehicle', admin: true },
  { to: '/delete', label: 'Delete vehicle', admin: true },
  { to: '/logout', label: 'Logout', auth: true },
];

const navItemClass = `
  ${styles.navItem}
  transition-all duration-200
  hover:scale-105
  hover:shadow-md
  hover:bg-red-50
  hover:text-red-600
  rounded
  cursor-pointer
`;

const Navigation = () => {
  const [state, setState] = useState(false);
  const handleClick = () => setState(!state);

  const storedUserJSON = localStorage.getItem('user');
  const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

  const isAuthenticated = !!(storedUser && storedUser.data && storedUser.data.id);
  if (isAuthenticated) {
    storedUser.data.isAdmin = true;
    localStorage.setItem('user', JSON.stringify(storedUser));
  }
  const isAdmin = isAuthenticated && storedUser.data.isAdmin;

  return (
    <div>
      {!state && (
        <div className={styles.sideBarIconBox}>
          <FontAwesomeIcon
            onClick={handleClick}
            icon={faBars}
            className={`
              ${styles.iconMed} ${styles.iconBar}
              transition-all duration-300
              hover:scale-110 hover:text-red-500
              hover:shadow-lg hover:shadow-red-200
              hover:animate-pulse
              cursor-pointer
            `}
          />
        </div>
      )}
      <nav className={`${styles.sectionSidbar} ${state ? styles.open : ''}`}>
        <div className={styles.sideBarIconBox}>
          <FontAwesomeIcon
            onClick={handleClick}
            icon={faXmark}
            className={`
              ${styles.iconMed}
              transition-transform duration-200
              hover:rotate-180
              hover:scale-110
              hover:text-red-500
              cursor-pointer
            `}
          />
        </div>
        <div className={styles.logoBox}>
          <img 
            src={image} 
            alt="Rent cars logo"
            className="pt-16 transition-transform duration-300 cursor-pointer hover:scale-110 hover:rotate-6"
          />
        </div>
        <ul className={styles.nav}>
          {navLinks
            .filter(link =>
              isAuthenticated
                ? link.auth || (isAdmin && link.admin)
                : link.guest
            )
            .map(link => (
              <li key={link.to} className={navItemClass}>
                <NavLink
                  to={link.to}
                  onClick={handleClick}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;