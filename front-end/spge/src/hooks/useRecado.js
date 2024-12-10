import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import rotasDeProfessor from "../constants/rotasDeProfessor";
import rotasDeFuncionario from "../constants/rotasDeFuncionario";
import useSessao from "./useSessao";
import useTratarErro from "./useTratarErro";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";
import useRotas from "./useRotas";


const useRecado = () => {

  const paginaAtual = "/".concat(useLocation().pathname.split("/")[1]);
  const {codigoSalaParam, codigoAlunoParam} = useParams();
  const {nomeProfessor} = useSessao();
  const {tratarErro} = useTratarErro();
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {rotaPassada} = useRotas();

  const [recado, setRecado] = useState({
    codigoSala: (codigoSalaParam) ? codigoSalaParam : "",
    codigoAluno: (codigoAlunoParam) ? codigoAlunoParam : "",
    nomeRemetente: (nomeProfessor) ? nomeProfessor : "",
    tipoRemetente: (rotasDeProfessor.includes(paginaAtual)) ? "professor" : (rotasDeFuncionario.includes(location.pathname)) ? "secretário" : "",
    publicoAlvo: (paginaAtual == "/enviarRecadoParaSala") ? "sala" : (paginaAtual == "/enviarRecadoParaAluno") ? "aluno" : "",
    recado: ""
  });

  
  console.log(recado)

  const preencherRecado = (e) => {
    setRecado({...recado, [e.target.name] : e.target.value});
  }

  const enviarRecado  = (url, nomeEntidade) => {
    exibirCardLoader();
    api.post("/recado".concat(url), {
      ...recado
    })
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        rotaPassada,
        "Recado enviado para "+nomeEntidade+" com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const enviarRecadoParaSala  = () => {
    enviarRecado("/paraSala", "sala")
  }

  const enviarRecadoParaAluno  = () => {
    enviarRecado("/paraAluno", "aluno")
  }

  //Envios de formulário
  const enviarFormularioEnviarRecadoParaSala = (e) => {
    e.preventDefault();
    enviarRecadoParaSala();
  }

  const enviarFormularioEnviarRecadoParaAluno = (e) => {
    e.preventDefault();
    enviarRecadoParaAluno();
  }


  return{
    recado, preencherRecado,
    enviarFormularioEnviarRecadoParaSala, enviarFormularioEnviarRecadoParaAluno
  };
}

export default useRecado;