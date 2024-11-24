import { useState } from "react";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useSessao from "./useSessao";

const useAluno = () => {

  const [aluno, setAluno] = useState({});
  const {tratarErro} = useTratarErro();
  const {logar} = useSessao();

  const preencherAluno = (e) => {
    setAluno({...aluno, [e.target.name] : e.target.value});
  }

  const fazerLogin = () => {
    api.post("/aluno/login", {
      email: aluno.email.trim(),
      senha: aluno.senha.trim()
    })
    .then((resp) => {
      let a = resp.data;
      console.log(a)
      logar(a);
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const enviarFormularioFazerLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  return{aluno, preencherAluno, enviarFormularioFazerLogin};
}


export default useAluno;