import ListaDeEntidades from '../ListaDeEntidades';
import styles from './ListaDeAulas.module.css';


export default function ListaDeAulas({aulas}){

  return(
    <ListaDeEntidades
      entidade={aulas}
      nomeEntidade={"aulas"}
    >
      <div className={styles.painelAulas}>
        {
          aulas.map((aula) => (
            <details
              key={aula.codigo}
              className={styles.aula}
            >
              <summary>
                <p>
                  {aula.data.split(" ")[0]}
                  <br />
                  {aula.quantidadeDeAulasContinuas} aula{(aula.quantidadeDeAulasContinuas > 1) && "s"}  
                </p>

                <div className={styles.verMais}>Ver chamada</div>
              </summary>

              { 
                aula.listaDePresenca.length ? (
                  <div className={styles.listaDePresenca}>
                    <div className={styles.margemListaDePresenca}>
                      {
                        aula.listaDePresenca.map((presenca) => (
                          <div
                            key={presenca.codigo}
                            className={styles.presenca+" "+[(presenca.codigo % 2 == 0) && "par"]}
                          >
                            <p>
                              {presenca.nomeAluno}
                            </p>
    
                            <div className={styles.faltaOuPresenca+" "+styles[(presenca.presenca == "P") && "presente"]}></div>
                          </div>
                        ))
                      }
                    </div>
                  </div>   
                ) : <p>Sem lista de presença</p>
              }
            </details>
          ))
        }
      </div>
    </ListaDeEntidades>
  )

}