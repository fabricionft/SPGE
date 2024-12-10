import styles from './FormFazerChamada.module.css';

import useAlunos from "../../../hooks/useAlunos";
import useChamada from '../../../hooks/useChamada';


export default function FormFazerChamada(){

  const {chamada, setChamada, mudarChamada, enviarFormularioChamada} = useChamada();
  const {alunos} = useAlunos();
  const numeros = [1, 2, 3, 4];

  return(
    <>
     {
        alunos.length && (
          <form
            onSubmit={enviarFormularioChamada}
          >
              <label>Número do bimestre</label>
              <select
                name='numeroDoBimestre'
                onChange={(e) => setChamada({...chamada, [e.target.name] : e.target.value})}
              >
                <option 
                  value="escolha"
                >
                  Escolha
                </option>
                
                {
                  numeros.map((numero) => (
                    <option
                      key={numero} 
                      value={numero}
                    >
                      {numero}º bimestre
                    </option>
                  ))
                }
              </select>


              <label>Quantidade de aulas contínuas</label>
              <select
                name='quantidadeDeAulas'
                onChange={(e) => setChamada({...chamada, [e.target.name] : e.target.value})}
              >
                <option 
                  value="escolha"
                >
                  Escolha
                </option>
                
                {
                  numeros.map((numero) => (
                    <option 
                      key={numero}
                      value={numero}
                    >
                      {numero} aula{(numero > 1) && "s"}
                    </option>
                  ))
                }
              </select>

              <strong>
                <p>Alunos:</p>
              </strong>

              {
                alunos.map((aluno, index) => (
                  <div
                    key={aluno.codigo} 
                    className={styles.listaChamada}
                  >
                    <p>{aluno.nome}</p>
                    <div className={styles.faltaOuPresenca+" "+styles[(chamada.presencas[index] == "P") && "presente"]}
                      onClick={() => mudarChamada(index)}
                    ></div>
                  </div>
                ))
              }

              <button
                className={[(chamada.numeroDoBimestre == "escolha" || chamada.quantidadeDeAulas == "escolha") && "desativado"]}
                disabled={(chamada.numeroDoBimestre == "escolha" || chamada.quantidadeDeAulas == "escolha")}
              >
                Concluir chamada
              </button>
          </form>
        )
      }
    </>
  );
}