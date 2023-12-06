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
  return state ? (
    <nav className={styles.sectionSidbar}>
      <div className={styles.sideBarIconBox}>
        <FontAwesomeIcon onClick={handleClick} icon={faXmark} className={styles.iconMed} />
      </div>
      <div className={styles.logoBox}>
        <img src={image} alt="marcedes logo" />
      </div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <NavLink to="/vehicles" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Vehicles</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/new-reservation" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Reserve</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/my-reservations" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>My reservations</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/new-vehicle" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Add vehicle</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/delete-vehicle" onClick={handleClick} className={({ isActive }) => (isActive ? styles.active : '')}>Delete vehicle</NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <div className={styles.sideBarIconBox}>
      <FontAwesomeIcon onClick={handleClick} icon={faBars} className={`${styles.iconMed} ${styles.iconBar}`} />
    </div>
  );
};

export default Navigation;
