import { useState } from "react";
import useProfessores from "../../../hooks/useProfessores";
import ListaDeEntidades from "../../utils/ListaDeEntidades";
import useSala from "../../../hooks/useSala";
import { useParams } from "react-router-dom";

export default function FormAdicionarProfessorEmUmaSala(){

  const {professores} = useProfessores();
  const [codigoProfessor, setCodigoProfessor] = useState("escolha");
  const {enviarFormularioAdicionarProfessorEmUmaSala} = useSala();
  const {codigoSalaParaAdicionarProfessorParam} = useParams();

  console.log(codigoProfessor);

  return(
    <ListaDeEntidades
      entidade={professores}
      mensagemPersonalizada={"Não existem professores disponíveis para esta sala no momento!"}
    >
      <form
        onSubmit={(e) => enviarFormularioAdicionarProfessorEmUmaSala(e, codigoSalaParaAdicionarProfessorParam, codigoSalaParaAdicionarProfessorParam)}
      >
        <select
          value={codigoProfessor || "escolha"}
          onChange={(e) => setCodigoProfessor(e.target.value)}
        >
          <option 
            value={"escolha"}
          >
            Escolha
          </option>
          
          {
            professores.map((professor) => (
              <option
                key={professor.codigo}
                value={professor.codigo}
              >
                {professor.nome} - {professor.materia}
              </option>
            ))
          }
        </select>

        <button
           className={[(!codigoProfessor || codigoProfessor == "escolha") && "desativado"]}
           disabled={(!codigoProfessor || codigoProfessor == "escolha")}
        >
          Finalizar
        </button>
      </form>
    </ListaDeEntidades>
  )
}