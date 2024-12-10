import { useContext, useEffect } from "react"
import { RenderizacaoContext } from "../contexts/RenderizacaoContext"
import { useLocation } from "react-router-dom";

const useRenderizacao = () => {

  const {renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo} = useContext(RenderizacaoContext);
  const location = useLocation();

  useEffect(() => {
    setRenderizarDeterminadoConteudo("alunos");
  }, [location.pathname]);

  return{renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo}
}

export default useRenderizacao;