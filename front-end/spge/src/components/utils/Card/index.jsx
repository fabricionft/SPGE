import styles from './Card.module.css';

import {Link} from 'react-router-dom';


export default function Card({destino, children}){

  return(
    <Link
      to={destino}
      className={styles.card}
    >
      <div className={styles.margemCard}>
        {children}
      </div>
    </Link>
  )
}