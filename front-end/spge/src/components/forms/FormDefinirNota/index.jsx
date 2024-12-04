import useProfessor from "../../../hooks/useProfessor";
import InputNumerico from "../../itensForm/InputNumerico";
import useAluno from '../../../hooks/useAluno';


export default function FormDefinirNota(){

  const {definirNota, preecnherDefinirNota, enviarFormularioDefinirNota} = useProfessor();
  const {dadosAluno} = useAluno();

 return(
    <>
      {
        dadosAluno.codigo && (
          <form onSubmit={enviarFormularioDefinirNota}>
            <label>Aluno</label>
            <input 
              type="text" 
              value={dadosAluno.nome}
              readOnly  
            />

            <label>Bimestre</label>
            <select 
              name="numeroDoBimestre" 
              onChange={(e) => preecnherDefinirNota(e)}
            >
              <option value="escolha">Escolha</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label>Nota</label>
            <InputNumerico
              maximoDeCaracteres={2}
              dica={"Digite a nota"}
              valorMaximo={10}
              nome={"nota"}
              preencherEntidade={preecnherDefinirNota}
              entidade={definirNota.nota}
            />

            <button
              className={[(definirNota.numeroDoBimestre !== "escolha" && definirNota.nota) ? "" : "desativado"]}
              disabled={(definirNota.numeroDoBimestre !== "escolha" && definirNota.nota) ? false : true}
            >
              Definir nota
            </button>
          </form>
        )
      }
    </>
  )
}