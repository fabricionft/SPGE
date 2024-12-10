import styles from './ListaDeEntidades.module.css';

import useLoader from "../../../hooks/useLoader"
import Loader from "../Loader";


export default function ListaDeEntidades({entidade, nomeEntidade, mensagemPersonalizada, children}){

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
            {
              (mensagemPersonalizada) ? (
                <p>
                  {mensagemPersonalizada}
                </p>
              ) : (
                <p>
                  A lista de {nomeEntidade} ainda não possui registros!
                </p>
              )
          } 
          </div>
        )
      }
    </>
  )
}