import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import api from "../services/api.js";
import useTratarErro from "./useTratarErro.js";
import useLoader from "./useLoader.js";
import useMessageBox from "./useMessageBox.js";

const useSala = () => {

  const [sala, setSala] = useState({
    serie: "escolha",
    turma: "escolha"
  });
  const {codigoSala} = useParams();
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


  if(codigoSala){
    useEffect(() => {
      api.get("/sala/".concat(codigoSala))
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

  return{
    sala, setSala, preencherSala,
    enviarFormularioCriarSala
  };
}

export default useSala;