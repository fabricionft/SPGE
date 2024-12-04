import styles from './BoletimAluno.module.css';

import useAluno from "../../../hooks/useAluno";
import ListaDeEntidades from "../../utils/ListaDeEntidades";


export default function BoletimAluno(){

  const {dadosAluno} = useAluno();
  const bimestres = [1, 2, 3, 4];

  return(
    <>
      <div className={styles.legendas}>
        <div className={styles.legendaMateria}>Matéria</div>
        <div className={styles.legendaBimestres}>
          {
            bimestres.map((bimestre) => (
              <div
                key={bimestre} 
                className={styles.legendaBimestre}
              >
                <p className={styles.legendaNumeroBimestre}>
                  {bimestre}º Bim
                </p>

                <div className={styles.legendaNota}>N</div>

                <div className={styles.legendaPresencasEFaltas}>T/P/F</div>
              </div>
            ))
          }
        </div>
      </div>

      {
        dadosAluno.codigo && (
          <div className={styles.tabelaNotas}>
            {
              dadosAluno.historicoDeDesempenho[0].desempenho.map((materia, index) => (
                <div
                  key={index} 
                  className={styles.linhaMateria+" "+styles[(index % 2 == 0) && "par"]}
                >
                  <div
                    className={styles.materia}
                  >
                    {materia.materia}
                  </div>

                  <div className={styles.bimestres}>
                    {
                      dadosAluno.historicoDeDesempenho.map((bimestre, index) => (
                        <div
                          key={index}
                          className={styles.bimestre}
                        >
                          <div className={styles.nota}>
                            {
                              bimestre.desempenho.find((desempenho) => desempenho.materia == materia.materia).nota.toFixed(1)
                            }
                          </div>

                          <div className={styles.presencasEFaltas}>
                            {bimestre.desempenho.find((desempenho) => desempenho.materia == materia.materia).totalDeAulas}
                            /
                            {bimestre.desempenho.find((desempenho) => desempenho.materia == materia.materia).totalDePresencas}
                            /
                            {bimestre.desempenho.find((desempenho) => desempenho.materia == materia.materia).totalDeAulas - bimestre.desempenho.find((desempenho) => desempenho.materia == materia.materia).totalDePresencas}
                          </div>
                          <br />
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }            
          </div>
        )
      }
      </>
  )
}