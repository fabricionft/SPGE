import styles from './Header.module.css';

import iconMenu from '../../../assets/icons/iconMenu.png';


export default function Header(){

  return(
    <header className={styles.header}>
      <label htmlFor="menuBar">
        <img 
          src={iconMenu} 
          alt="Icon menu" 
        />
      </label>
    </header>
  )
}