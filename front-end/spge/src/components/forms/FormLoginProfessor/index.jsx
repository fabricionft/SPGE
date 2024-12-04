import useProfessor from "../../../hooks/useProfessor"
import Input from "../../itensForm/Input";
import InputSenha from "../../itensForm/Inputsenha";

export default function FormLoginProfessor(){

  const {professor, preencherProfessor, enviarFormularioFazerLogin} = useProfessor();


  return(
    <form onSubmit={enviarFormularioFazerLogin}>
      <Input
        dica={"Digite seu email"}
        nome={"email"}
        preencherEntidade={preencherProfessor}
        entidade={professor.email}
      />

      <InputSenha
        dica={"Digite sua senha"}
        nome={"senha"}
        preencherEntidade={preencherProfessor}
        entidade={professor.senha}
      />


      <button
        disabled={(professor.email && professor.senha) ? false : true}
        className={(professor.email && professor.senha) ? "" : "desativado"}
      >
        Login
      </button>
    </form>
  )
}