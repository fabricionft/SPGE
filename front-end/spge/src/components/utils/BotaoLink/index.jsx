import useRotas from '../../../hooks/useRotas';
import styles from './BotaoLink.module.css';

import { Link } from "react-router-dom";


export default function BotaoLink({destino, msg, margemNaDireia, margemEmBaixo}){

  const {marcarRotaPassada} = useRotas();

  return(
    <Link
      to={destino}
      className={styles.botaoLink+" "+styles[(margemNaDireia) && "margemNaDireita"]+" "+styles[(margemEmBaixo) && "margemEmBaixo"]}
      onClick={marcarRotaPassada}
    >
      {msg}
    </Link>
  )
}