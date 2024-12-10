import styles from './ListaDeRecados.module.css';

import ListaDeEntidades from "../ListaDeEntidades";

export default function ListaDeRecados({recados}){

  console.log(recados.length)

  return(
    <ListaDeEntidades
      entidade={recados}
      nomeEntidade={"recados"}
    >
      <div
        className={styles.painelRecados}
      >
        {
          recados.map((recado) => (
            <details
              key={recado.codigo}
              className={styles.recado}
            >
              <summary>
                <p>{recado.tipoRemetente} - {recado.nomeRemetente} - {recado.data}</p>

                <div className={styles.verMais}>Ver recado</div>
              </summary>

              <div className={styles.info}>
                <p>
                  {recado.recado}
                </p>
              </div>
            </details>
          ))
        }
      </div>
    </ListaDeEntidades>
  )
}