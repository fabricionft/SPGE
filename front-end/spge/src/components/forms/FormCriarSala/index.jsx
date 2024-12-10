import styles from './FormCriarSala.module.css';

import useMaterias from "../../../hooks/useMaterias";
import useSala from "../../../hooks/useSala";
import { useState } from 'react';

export default function FormCriarSala(){

  const periodos = ["escolha", "Matutino", "Noturno", "Integral"]
  const series = ["escolha", 6, 7, 8, 9, 1, 2, 3];
  const alfabeto = ["escolha", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const {sala, setSala, preencherSala, enviarFormularioCriarSala} = useSala();
  const {materias} = useMaterias();

  const [listaDematerias, setListaDeMaterias] = useState([]);

  const adicionarMateria = (materia) => { 
    if(listaDematerias.includes(materia)){
      let materiasreduzidas = [...listaDematerias];
      materiasreduzidas.splice(listaDematerias.indexOf(materia), 1);
      setListaDeMaterias(materiasreduzidas);
    }else{
      setListaDeMaterias(listaAnterior => [...listaAnterior, materia])
    }
  }
  
  return(
    <form onSubmit={(e) => enviarFormularioCriarSala(e, listaDematerias)}>
      <label>Período</label>
      <select
        name="periodo"
        onChange={(e) => preencherSala(e)}
      >
         {
          periodos.map((periodo, index) => (
            <option
              key={index}
              value={periodo}
            >
              {periodo}
            </option>
          ))
        }
      </select>

      <label>Série</label>
      <select
        name="serie"
        onChange={(e) => preencherSala(e)}
      >
        {
          series.map((serie, index) => (
            <option
              key={index}
              value={serie}
            >
              {serie}{[6, 7, 8, 9].includes(serie) ? "º do Fundamental II" : [1, 2, 3].includes(serie) && "º do Ensino Médio"}
            </option>
          ))
        }
      </select>

      <label htmlFor="">Turma</label>
      <select
        name="turma"
        onChange={(e) => preencherSala(e)}
      >
        {
          alfabeto.map((letra, index) => (
            <option
              key={index}
              value={letra}
            >
              {letra}
            </option>
          ))
        }
      </select>

      <label>Matérias</label>
      {
        materias.length ? (
          <>
            {
              materias.map((materia, index) => (
                <div
                  key={index}
                  className={styles.linha}
                >
                  <input 
                    type="checkbox"
                    onClick={() => adicionarMateria(materia.materia)}
                  />
                  <p 
                    key={index}
                  >
                    {materia.materia}
                  </p>
                </div>
              ))
            }   
          </>
        ) : (
          <p>Sem matérias</p>
        )
      }

      <button
        className={[(sala.periodo == "escolha" || sala.serie == "escolha" || sala.turma == "escolha") ? "desativado" : ""]}
        disabled={(sala.periodo == "escolha" ||sala.serie == "escolha" || sala.turma == "escolha") ? true : false}
      >
        Criar
      </button>
    </form>
  )
}