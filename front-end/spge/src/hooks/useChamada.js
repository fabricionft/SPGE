import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import useSessao from "./useSessao";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";

const useChamada = () => {

  const {codigoSalaParaOrdemAlfabeticaParam} = useParams();
  const {codigoProfessor} = useSessao();
  const {tratarErro} = useTratarErro();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {exibirMessageBox} = useMessageBox();

  const [chamada, setChamada] = useState({
    codigoSala: codigoSalaParaOrdemAlfabeticaParam,
    codigoProfessor: codigoProfessor,
    numeroDoBimestre: "escolha",
    quantidadeDeAulas: "escolha",
    presencas: []
  });

  if(codigoSalaParaOrdemAlfabeticaParam){
    useEffect(() => {
      api.get("/sala/listaDeChamada/".concat(codigoSalaParaOrdemAlfabeticaParam))
      .then((resp) => {
        setChamada({...chamada, ['presencas'] : resp.data});
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  const mudarChamada = (indice) => {
    let c = [...chamada.presencas];
    let presente = (c[indice] == "P");
    c.splice(indice, 1, (presente) ? "F" : "P");
    setChamada({...chamada, ['presencas'] : c});
  }

  const fazerChamada = () => {
    exibirCardLoader();
    api.post("/professor/fazerChamada", {...chamada})
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/salaDoProfessor/'.concat(codigoProfessor),
        "Chamada realizada com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  } 

  const enviarFormularioChamada = (e) => {
    e.preventDefault();
    fazerChamada();
  }

  return{chamada, setChamada, mudarChamada, enviarFormularioChamada};
}

export default useChamada;