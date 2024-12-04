import useFuncionario from "../../../hooks/useFuncionario";
import Input from "../../itensForm/Input";
import InputSenha from "../../itensForm/Inputsenha";

export default function FormLoginFuncionario(){

  const {funcionario, preencherFuncionario, enviarFormularioLogin} = useFuncionario();

  return(
    <form onSubmit={enviarFormularioLogin}>
      <Input
        dica={"Digite o email"}
        nome={"email"}
        preencherEntidade={preencherFuncionario}
        entidade={funcionario.email}
      />

      <InputSenha
        dica={"Digite a senhal"}
        nome={"senha"}
        preencherEntidade={preencherFuncionario}
        entidade={funcionario.senha}
      />

      <button>Fazer login</button>
    </form>
  )
}