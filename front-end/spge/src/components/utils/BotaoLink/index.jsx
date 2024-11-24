import styles from './BotaoLink.module.css';

import { Link } from "react-router-dom";


export default function BotaoLink({destino, msg}){

  return(
    <Link
      to={destino}
      className={styles.botaoLink}
    >
      {msg}
    </Link>
  )
}