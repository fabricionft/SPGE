import useRotas from '../../../hooks/useRotas';
import styles from './BotaoLink.module.css';

import { Link } from "react-router-dom";


export default function BotaoLink({destino, msg}){

  const {marcarRotaPassada} = useRotas();

  return(
    <Link
      to={destino}
      className={styles.botaoLink}
      onClick={marcarRotaPassada}
    >
      {msg}
    </Link>
  )
}