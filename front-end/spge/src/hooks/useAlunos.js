import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import rotasDeFuncionario from "../constants/rotasDeFuncionario";
import useRenderizacao from "./useRenderizacao";

const useAlunos = () => {

  const [alunos, setAlunos] = useState([]);
  const {codigoSalaParam, codigoSalaParaAdicionarAlunoParam, codigoSalaParaOrdemAlfabeticaParam} = useParams();
  const {tratarErro} = useTratarErro();
  const {alterarVisibilidadeLoader} = useLoader();
  const location = useLocation();
  const {renderizarDeterminadoConteudo} = useRenderizacao();

  if(rotasDeFuncionario.includes(location.pathname)){
    useEffect(() => {
      api.get("/aluno")
      .then((resp) => {
        setAlunos(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }, []);
  }

  useEffect(() => {
    if(codigoSalaParam && renderizarDeterminadoConteudo === "alunos"){
      api.get("/aluno/listarAlunosDeUmaSala/".concat(codigoSalaParam))
      .then((resp) => {
        setAlunos(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }, [renderizarDeterminadoConteudo])
  
  if(codigoSalaParaAdicionarAlunoParam){
    useEffect(() => {
      api.get("/aluno/semSala")
      .then((resp) => {
        setAlunos(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  if(codigoSalaParaOrdemAlfabeticaParam){
    useEffect(() => {
      api.get("/aluno/listarAlunosDeUmaSalaEmOrdemAlfabetica/".concat(codigoSalaParaOrdemAlfabeticaParam))
      .then((resp) => {
        console.log(resp.data);
        setAlunos(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  return{alunos};
}

export default useAlunos;