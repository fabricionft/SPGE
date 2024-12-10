import { useEffect, useState } from "react";
import api from  '..//services/api';
import useTratarErro from '../hooks/useTratarErro';
import { useParams } from "react-router-dom";
import useRenderizacao from "./useRenderizacao";
import useLoader from "./useLoader";

const useAulaa = () => {

  const [aulas, setAulas] = useState([]);
  const {tratarErro} = useTratarErro();
  const {codigoSalaParam} = useParams();
  const {renderizarDeterminadoConteudo} = useRenderizacao();
  const {alterarVisibilidadeLoader} = useLoader();

  useEffect(() => {
    if(codigoSalaParam && renderizarDeterminadoConteudo == "aulas"){
      api.get("/aula/professor/".concat(codigoSalaParam))
      .then((resp) => {
        setAulas(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }, [renderizarDeterminadoConteudo]);

  return{aulas};
}

export default useAulaa;