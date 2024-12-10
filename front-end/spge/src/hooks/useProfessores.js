import { useEffect, useState } from "react";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import { useLocation, useParams } from "react-router-dom";
import useRenderizacao from "./useRenderizacao";

const useProfessores = () => {

  const [professores, setProfessores] = useState([]);
  const {tratarErro} = useTratarErro();
  const {alterarVisibilidadeLoader} = useLoader();
  const {codigoSalaParam, codigoSalaParaAdicionarProfessorParam} = useParams();
  const location = useLocation();
  const {renderizarDeterminadoConteudo} = useRenderizacao();

  if(location.pathname == "/professores"){
    useEffect(() => {
      api.get("/professor")
      .then((resp) => {
        setProfessores(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  useEffect(() => {
    if(codigoSalaParam && renderizarDeterminadoConteudo === "professores"){
      api.get("/professor/listarProfessoresDeUmaSala/".concat(codigoSalaParam))
      .then((resp) => {
        setProfessores(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }, [renderizarDeterminadoConteudo]);

  if(codigoSalaParaAdicionarProfessorParam){
    useEffect(() => {
      api.get("/professor/listarProfessoresQueNaoFazemParteDeDeterminadaSala/".concat(codigoSalaParaAdicionarProfessorParam))
      .then((resp) => {
        setProfessores(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  return{professores};
}

export default useProfessores;