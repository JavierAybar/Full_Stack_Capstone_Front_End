import { NavLink } from 'react-router-dom';
import { useState } from 'react';
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
        <button type="button" onClick={handleClick}>MENU</button>
      </div>
      <div className={styles.logoBox}>
        <img src={image} alt="marcedes logo" />
      </div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <NavLink to="/vehicles" className={({ isActive }) => (isActive ? styles.active : '')}>Vehicles</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/new-reservation" className={({ isActive }) => (isActive ? styles.active : '')}>Reserve</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/my-reservations" className={({ isActive }) => (isActive ? styles.active : '')}>My reservations</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/new-vehicle" className={({ isActive }) => (isActive ? styles.active : '')}>Add vehicle</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/delete-vehicle" className={({ isActive }) => (isActive ? styles.active : '')}>Delete vehicle</NavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <div className={styles.sideBarIconBox}>
      <button type="button" onClick={handleClick}>CLOSE</button>
    </div>
  );
};

export default Navigation;
