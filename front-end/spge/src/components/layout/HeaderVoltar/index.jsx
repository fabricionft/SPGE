import styles from './HeaderVoltar.module.css';

//Assets
import iconVoltar from '../../../assets/icons/iconVoltar.png';

import {Link} from 'react-router-dom'

export default function HeaderVoltar({destino}){


  return(
    <header
      className={styles.headerAluno}
    >
      <Link
        to={destino}
        className={styles.btnVoltar}
      >
        <img 
          src={iconVoltar} 
          alt="Icon voltar" 
        />
      </Link>
    </header>
  )
}