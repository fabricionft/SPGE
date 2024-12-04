import styles from './ListaDeEntidades.module.css';

import useLoader from "../../../hooks/useLoader"
import Loader from "../Loader";


export default function ListaDeEntidades({entidade, nomeEntidade, children}){

  const {visibilidadeLoader} = useLoader();

  return(
    <>
      {
        entidade.length ? (
          <>
            {children}
          </>
        ) : visibilidadeLoader ? (
          <Loader/>
        ) : (
          <div className={styles.aviso}>
            <p>
              A lista de {nomeEntidade} ainda não possui registros!
            </p>
          </div>
        )
      }
    </>
  )
}