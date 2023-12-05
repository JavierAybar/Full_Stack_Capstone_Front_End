import { NavLink } from 'react-router-dom';
import image from '../assets/mercedes-logo.png';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.sectionSidbar}>
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
        <NavLink to="/add-vehicle" className={({ isActive }) => (isActive ? styles.active : '')}>Add vehicle</NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/delete-vehicle" className={({ isActive }) => (isActive ? styles.active : '')}>Delete vehicle</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
