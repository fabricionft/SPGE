import { useContext, useEffect } from "react"
import { LoaderContext } from "../contexts/LoaderContext"
import { useLocation } from "react-router-dom";

const useLoader = () => {

  const {
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader,
    visibilidadeLoader, setVisibilidadeLoader
  } = useContext(LoaderContext);

  const location = useLocation();

  const alterarVisibilidadeLoader = (tamanhoDaLista) => {
    setVisibilidadeLoader((tamanhoDaLista > 0) ? true : false);
  }

  useEffect(() => {
    setVisibilidadeLoader(true);
  }, [location.pathname]);


  return {
    visibilidadeCardLoader, exibirCardLoader, esconderCardLoader,
    visibilidadeLoader, alterarVisibilidadeLoader
  };
}

export default useLoader;