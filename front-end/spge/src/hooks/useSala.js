import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import api from "../services/api.js";
import useTratarErro from "./useTratarErro.js";
import useLoader from "./useLoader.js";
import useMessageBox from "./useMessageBox.js";

const useSala = () => {

  const [sala, setSala] = useState({
    periodo: "escolha",
    serie: "escolha",
    turma: "escolha"
  });
  const {codigoSalaParam} = useParams();
  const {tratarErro} = useTratarErro(); 
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {exibirMessageBox} = useMessageBox();

  const preencherSala = (e) => {
    setSala({...sala, [e.target.name] : e.target.value});
  }

  const criarSala = (listaDeMaterias) => {
    exibirCardLoader();
    api.post("/sala", {
      materias: listaDeMaterias,
      ...sala
    })
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/salas',
        "Sala criada com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const adicionarAlunoEmUmaSala = (codigoSala, codigoAluno) => {
    exibirCardLoader();
    api.post("/sala/adicionar/codigoSala/"+codigoSala+"/codigoAluno/".concat(codigoAluno))
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/sala/'.concat(codigoSala),
        "Aluno adicionado com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const removerAlunoDeUmaSala = (codigoSala, codigoAluno) => {
    exibirCardLoader();
    api.put("/sala/remover/codigoSala/"+codigoSala+"/codigoAluno/".concat(codigoAluno))
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/sala/'.concat(codigoSala),
        "Aluno removido com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const adicionarProfessorEmUmaSala = (codigoSala, codigoProfessor) => {
    exibirCardLoader();
    api.post("/sala/adicionar/codigoSala/"+codigoSala+"/codigoProfessor/".concat(codigoProfessor))
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/sala/'.concat(codigoSala),
        "Professor adicionado com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const removerProfessorDeUmaSala = (codigoSala, codigoProfessor) => {
    exibirCardLoader();
    api.put("/sala/remover/codigoSala/"+codigoSala+"/codigoProfessor/".concat(codigoProfessor))
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/sala/'.concat(codigoSala),
        "Professor removido com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  if(codigoSalaParam){
    useEffect(() => {
      api.get("/sala/".concat(codigoSalaParam))
      .then((resp) => {
        setSala(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }, []);
  }


  //Envios de formulários
  const enviarFormularioCriarSala = (e, listaDeMaterias) => {
    e.preventDefault();
    criarSala(listaDeMaterias);
  }

  const enviarFormularioAdicionarAlunoEmUmaSala = (e, codigoSala, codigoAluno) => {
    e.preventDefault();
    adicionarAlunoEmUmaSala(codigoSala, codigoAluno);
  }

  const enviarFormularioAdicionarProfessorEmUmaSala = (e, codigoSala, codigoProfessor) => {
    e.preventDefault();
    adicionarProfessorEmUmaSala(codigoSala, codigoProfessor);
  }

  return{
    sala, setSala, preencherSala,
    enviarFormularioCriarSala, enviarFormularioAdicionarAlunoEmUmaSala, enviarFormularioAdicionarProfessorEmUmaSala,
    removerAlunoDeUmaSala, removerProfessorDeUmaSala
  };
}

export default useSala;