import { useEffect, useState } from "react"
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import { useLocation, useParams } from "react-router-dom";
import useRenderizacao from "./useRenderizacao";
import useSessao from '../hooks/useSessao';
import useLoader from "./useLoader";

const useRecados = () => {

  const [recados, setRecados] = useState([]);
  const {tratarErro} = useTratarErro();
  const {codigoSalaParam} = useParams();
  const {renderizarDeterminadoConteudo} = useRenderizacao();
  const location = useLocation();
  const {codigoAluno} = useSessao();
  const {alterarVisibilidadeLoader} = useLoader();

  useEffect(() => {
    if(codigoAluno && location.pathname == "/recadosAluno"){
      api.get("/recado/aluno/".concat(codigoAluno))
      .then((resp) => {
        setRecados(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }, []);

  useEffect(() => {
    if(codigoSalaParam && renderizarDeterminadoConteudo == "recados"){
      api.get("/recado/sala/".concat(codigoSalaParam))
      .then((resp) => {
        setRecados(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }, [renderizarDeterminadoConteudo]);

  return{recados}
}

export default useRecados;