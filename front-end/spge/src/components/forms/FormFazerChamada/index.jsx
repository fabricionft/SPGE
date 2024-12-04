import styles from './FormFazerChamada.module.css';

import useAlunos from "../../../hooks/useAlunos";
import { useEffect, useState } from 'react';


export default function FormFazerChamada(){

  const {alunos} = useAlunos();

  const lista = [];

  alunos.map(() => {
    lista.push("F")
  })

  const [a, setA] = useState([]);


  return(
    <>
      {
        alunos.length && (
          <form action="">
              <label htmlFor="">Quantidade de aulas contínuas</label>
              <select name="" id="">
                <option value="Escolha">Escolha</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
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
                    <div className={styles.faltaOuPresenca}
                      onClick={() => {
                        lista[index] = "P";
                        setA(lista);
                        console.log(a)
                      }}
                    ></div>
                  </div>
                ))
              }

              <button
   
              >
                Concluir chamada
              </button>
          </form>
        )
      }
    </>
  );
}