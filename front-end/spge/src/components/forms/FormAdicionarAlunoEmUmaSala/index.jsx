import { useState } from "react";
import useAlunos from "../../../hooks/useAlunos"
import useSala from "../../../hooks/useSala";
import ListaDeEntidades from "../../utils/ListaDeEntidades";
import { useParams } from "react-router-dom";

export default function FormAdicionarAlunoEmUmaSala(){

  const {alunos} = useAlunos();
  const [codigoAluno, setCodigoAluno] = useState();
  const {codigoSalaParaAdicionarAlunoParam} = useParams();
  const {enviarFormularioAdicionarAlunoEmUmaSala} = useSala();
  
  console.log(alunos)

  return(
    <ListaDeEntidades
      entidade={alunos}
      mensagemPersonalizada={"Não existem alunos sem sala no momento!"}
    >
      <form
        onSubmit={(e) => enviarFormularioAdicionarAlunoEmUmaSala(e, codigoSalaParaAdicionarAlunoParam, codigoAluno)}
      >
        <select
          onChange={(e) => setCodigoAluno(e.target.value)}
          value={codigoAluno || "escolha"}
        >
          <option 
            value="escolha"
          >
            Escolha
          </option>
          
          {
            alunos.map((aluno) => (
              <option
                key={aluno.codigo}
                value={aluno.codigo}
              >
                {aluno.nome} - {aluno.ra} - {aluno.dia}/ {aluno.mes}/ {aluno.ano}
              </option>
            ))
          }
        </select>

        <button
          className={[(!codigoAluno || codigoAluno == "escolha") && "desativado"]}
          disabled={(!codigoAluno || codigoAluno == "escolha")}
        >
          Finalizar
        </button>
      </form>
    </ListaDeEntidades>
  )
}