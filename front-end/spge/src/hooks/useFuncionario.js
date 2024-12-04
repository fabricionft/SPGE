import { useState } from "react";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useSessao from './useSessao';
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";


const useFuncionario = () => {

  const [funcionario, setFuncionario] = useState({});
  const {tratarErro} = useTratarErro();
  const {logarFuncionario} = useSessao();
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  const preencherFuncionario = (e) => {
    setFuncionario({...funcionario, [e.target.name] : e.target.value});
  }

  const fazerLogin = () => {
    exibirCardLoader();
    api.post("/funcionario/login", {
      email: funcionario.email.trim(),
      senha: funcionario.senha.trim()
    })
    .then((resp) => {
      esconderCardLoader();
      logarFuncionario(resp.data);
      exibirMessageBox(
        '/menuFuncionario',
        "Logado com sucesso!",
        0
      )
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const enviarFormularioLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  return{funcionario, preencherFuncionario, enviarFormularioLogin};
}

export default useFuncionario;