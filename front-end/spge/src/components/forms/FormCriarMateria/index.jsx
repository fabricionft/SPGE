import useMateria from "../../../hooks/useMateria";
import Input from "../../itensForm/Input";

export default function FormCriarMateria(){

  const {materia, preencherMateria, enviarFormularioSalvarMateria} = useMateria();

  return(
    <form
      onSubmit={enviarFormularioSalvarMateria}
    >
      <label>Matéria</label>
      <Input
        dica={"Digite o nome da matéria"}
        nome={"materia"}
        preencherEntidade={preencherMateria}
        entidade={materia.materia}
      />

      <button
        className={[(materia.materia) ? "" : "desativado"]}
        disabled={(materia.materia) ? false : true}
      >
        Criar
      </button>
    </form>
  )
}