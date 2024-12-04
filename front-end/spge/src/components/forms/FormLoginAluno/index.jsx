import useAluno from "../../../hooks/useAluno";
import useSessao from "../../../hooks/useSessao";
import Input from "../../itensForm/Input";
import InputSenha from "../../itensForm/Inputsenha";

export default function FormLoginAluno(){

  const {aluno, preencherAluno, enviarFormularioFazerLogin} = useAluno();
  const {codigo, deslogar} = useSessao();

  return(
    <form onSubmit={enviarFormularioFazerLogin}>
      <Input
        dica={"Digite seu email"}
        nome={"email"}
        preencherEntidade={preencherAluno}
        entidade={aluno.email}
      />

      <InputSenha
        dica={"Digite sua senha"}
        nome={"senha"}
        preencherEntidade={preencherAluno}
        entidade={aluno.senha}
      />


      <button
        disabled={(aluno.email && aluno.senha) ? false : true}
        className={(aluno.email && aluno.senha) ? "" : "desativado"}
      >
        Login
      </button>

      <>
        {
          codigo && <p onClick={deslogar}>Deslogar</p>
        }
      </>
    </form>
  )
}