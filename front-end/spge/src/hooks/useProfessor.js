import { useEffect, useState } from "react";
import useTratarErro from "./useTratarErro";
import api from "../services/api";
import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";
import useSessao from "./useSessao";
import { useParams } from "react-router-dom";
import useRotas from "./useRotas";

const useProfessor = () => {

  const [professor, setProfessor] = useState({});
  const {tratarErro} = useTratarErro();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {exibirMessageBox} = useMessageBox();
  const {logarProfessor, codigoProfessor, materiaProfessor} = useSessao();
  const {rotaPassada} = useRotas();
  const {codigoProfessorParam, codigoAlunoParam} = useParams();


  const preencherProfessor = (e) => {setProfessor({...professor, [e.target.name] : e.target.value})};


  if(codigoProfessorParam){
    useEffect(() => {
      api.get("/professor/".concat(codigoProfessorParam))
      .then((resp) => {
        setProfessor(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  const salvarProfessor = () => {
    exibirCardLoader();
    api.post("/professor/".concat(location.pathname == "/adicionarProfessor"), {
      email: professor.email.trim(),
      ...professor
    })
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/professores',
        "Professor salvo com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const excluieProfessor = (codigo) => {
    exibirCardLoader();
    api.delete("/professor/".concat(codigo))
    .then((resp) => {
      esconderCardLoader();
      exibirMessageBox(
        '',
        resp.data,
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const fazerLogin = () => {
    exibirCardLoader();
    api.post("/professor/login", {
      email: professor.email.trim(),
      senha: professor.senha.trim()
    })
    .then((resp) => {
      esconderCardLoader();
      exibirMessageBox(
        '/menuProfessor',
        "Logado com sucesso!",
        0
      );
      logarProfessor(resp.data);
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }


  //Ações para alunos
  const [definirNota, setDefinirNota] = useState({
    codigoProfessor: codigoProfessor,
    codigoAluno: codigoAlunoParam,
    numeroDoBimestre: "escolha",
    materia: materiaProfessor
  });

  const definirNotaParaOAluno = () => {
    exibirCardLoader();
    api.put("/professor/definirNota", {...definirNota})
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        rotaPassada,
        "Nota alterada com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const preecnherDefinirNota = (e) => {
    setDefinirNota({...definirNota, [e.target.name] : e.target.value});
  }

  const [listaDepresencas, setListaDePresencas] = useState([]);



  //Envio de formulários
  const enviarFormularioFazerLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  const enviarFormularioSalvarProfessor = (e) => {
    e.preventDefault();
    salvarProfessor();
  }

  const enviarFormularioDefinirNota = (e) => {
    e.preventDefault();
    definirNotaParaOAluno();
  }

  return{
    professor, preencherProfessor, enviarFormularioSalvarProfessor, enviarFormularioFazerLogin, excluieProfessor,
    definirNota, preecnherDefinirNota, enviarFormularioDefinirNota
  };
}

export default useProfessor;