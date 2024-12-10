import { useEffect, useState } from "react";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useSessao from "./useSessao";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";
import { useParams } from "react-router-dom";
import rotasDeAluno from "../constants/rotasDeAluno";

const useAluno = () => {

  const [aluno, setAluno] = useState({
    mes: "escolha",
    dia: "escolha",
    ano: "escolha",
    cep: "",
    email: ""
  });

  const {tratarErro} = useTratarErro();
  const {logarAluno} = useSessao();
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {sessaoAluno, codigoAluno} = useSessao();
  const {codigoAlunoParam} = useParams();

  const preencherAluno = (e) => {
    setAluno({...aluno, [e.target.name] : e.target.value});
  }

  if(codigoAlunoParam){
    useEffect(() => {
      api.get("/aluno/".concat(codigoAlunoParam))
      .then((resp) => {
        setAluno(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  const buscarCep = () => {
    exibirCardLoader();
    fetch('https://viacep.com.br/ws/'+aluno.cep+'/json/')
    .then( response => response.json())
    .then( json => {
      esconderCardLoader();
      setAluno({...aluno, 
        ['estado'] : json.uf,
        ['cidade'] : json.localidade,
        ['bairro'] : json.bairro,
        ['rua'] : json.logradouro,
        ['numero'] : ''
      });
    });
  }

  const salvarAluno = () => {
    exibirCardLoader();
    api.post("/aluno/".concat((location.pathname == "/adicionarAluno")), {
      email: aluno.email.trim(),
      ...aluno
    })
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/alunos',
        "Aluno salvo com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }
  
  const fazerLogin = () => {
    exibirCardLoader();
    api.post("/aluno/login", {
      email: aluno.email.trim(),
      senha: aluno.senha.trim()
    })
    .then((resp) => {
      exibirMessageBox(
        "/menuAluno",
        "Logado com sucesso",
        0
      );
      logarAluno(resp.data);
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const excluirAluno = (codigoAluno) => {
    api.delete("/aluno/".concat(codigoAluno))
    .then((resp) => {
      exibirMessageBox(
        '',
        "Aluno excluído com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  //Envio de formulários
  const enviarFormularioSalvarAluno = (e) => {
    e.preventDefault();
    salvarAluno();
  }

  const enviarFormularioFazerLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  //Dados
  const [dadosAluno, setDadosAluno] = useState({});

  const buscarAlunoPorCodigo = (codigo) => {
    useEffect(() => {
      api.get("/aluno/".concat(codigo))
      .then((resp) => {
        setDadosAluno(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  if(rotasDeAluno.includes(location.pathname) && sessaoAluno){
    buscarAlunoPorCodigo(codigoAluno);
  }

  if(codigoAlunoParam){
    buscarAlunoPorCodigo(codigoAlunoParam)
  }

  return{
    aluno, preencherAluno, enviarFormularioFazerLogin, enviarFormularioSalvarAluno, excluirAluno,
    dadosAluno, buscarCep
  };
}


export default useAluno;