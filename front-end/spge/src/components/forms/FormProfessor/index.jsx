import { useLocation } from "react-router-dom";
import useMaterias from "../../../hooks/useMaterias";
import useProfessor from "../../../hooks/useProfessor";
import Input from "../../itensForm/Input";
import InputNumerico from "../../itensForm/InputNumerico";
import useValidacao from "../../../hooks/useValidacao";

export default function FormProfessor(){

  const {professor, preencherProfessor, enviarFormularioSalvarProfessor} = useProfessor();
  const {materias} = useMaterias();
  const location = useLocation();
  const {validarCadastroProfessor} = useValidacao();

  return(
    <form>
      <label>Nome</label>
      <Input
        dica={"Digite o nome do professor"}
        nome={"nome"}
        preencherEntidade={preencherProfessor}
        entidade={professor.nome}
      />

      <label>Email (com sufixo @gmail.com)</label>
      <Input
        dica={"Digite o email do professor"}
        nome={"email"}
        preencherEntidade={preencherProfessor}
        entidade={professor.email}
        rotaASerBloqueada={"/editarProfessor"}
      />

      <label>CPF (somente números)</label>
      <InputNumerico
        dica={"Digite o CPF do professor"}
        nome={"cpf"}
        preencherEntidade={preencherProfessor}
        entidade={professor.cpf}
        maximoDeCaracteres={11}
        rotaASerBloqueada={"/editarProfessor"}
      />

      <label>Matéria</label>
      <select 
        name="materia"
        onChange={(e) => preencherProfessor(e)} 
        disabled={("/".concat(location.pathname.split("/")[1]) == "/editarProfessor")} 
        value={professor.materia || "escolha"}
      >
        <option value={"escolha"}>Escolha</option>
        {
          materias.map((materia) => (
            <option 
              key={materia.codigo}
              value={materia.materia}
            >
              {materia.materia}
            </option>
          ))
        }
      </select>

      <button
        type="button"
        onClick={(e) => {
          if(validarCadastroProfessor(professor)){
            enviarFormularioSalvarProfessor(e);
          }
        }}
      >
        Finalizar
      </button>
    </form>
  )
}