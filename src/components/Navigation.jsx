import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import image from '../assets/mercedes-logo.png';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
  };

const storedUserJSON = localStorage.getItem('user');
let storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;

const isAuthenticated = storedUser && storedUser.data && storedUser.data.id ? true : false;
if (isAuthenticated) {
  storedUser.data.isAdmin = true;
  localStorage.setItem('user', JSON.stringify(storedUser));
}

const isAdmin = isAuthenticated && storedUser.data.isAdmin;

  // debugging admin authentication
  console.log('isAuthenticated:', isAuthenticated);
  console.log('isAdmin:', isAdmin);


  return (
    <div>
      {state ? (
        <nav className={styles.sectionSidbar}>
          <div className={styles.sideBarIconBox}>
            <FontAwesomeIcon onClick={handleClick} icon={faXmark} className={styles.iconMed} />
          </div>
          <div className={styles.logoBox}>
            <img src={image} alt="mercedes logo" />
          </div>
          <ul className={styles.nav}>
            {!isAuthenticated && (
              <li className={styles.navItem}>
                <NavLink to="/" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
              </li>
            )}

            {isAuthenticated ? (
              <>
                <li className={styles.navItem}>
                  <NavLink to="/vehicles" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Vehicles</NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink to="/new-reservation" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Reserve</NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink to="/my-reservations" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>My reservations</NavLink>
                </li>
                {isAdmin && (
                  <li className={styles.navItem}>
                    <NavLink to="/new-vehicle" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Add vehicle</NavLink>
                  </li>
                )}
                {isAdmin && (
                  <li className={styles.navItem}>
                    <NavLink to="/delete" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Delete vehicle</NavLink>
                  </li>
                )}
                <li className={styles.navItem}>
                  <NavLink to="/logout" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <NavLink to="/login" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Login</NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink to="/register" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      ) : (
        <div className={styles.sideBarIconBox}>
          <FontAwesomeIcon onClick={handleClick} icon={faBars} className={`${styles.iconMed} ${styles.iconBar}`} />
        </div>
      )}
    </div>
  );
};

export default Navigation;