import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {

  const [visibilidadeCardLoader, setVisibilidadeCardLoader] = useState(false);

  const exibirCardLoader = () => {setVisibilidadeCardLoader(true)};
  const esconderCardLoader = () => {setVisibilidadeCardLoader(false)};

  const [visibilidadeLoader, setVisibilidadeLoader] = useState(true);

  return(
    <LoaderContext.Provider
      value={{
        visibilidadeCardLoader, exibirCardLoader, esconderCardLoader,
        visibilidadeLoader, setVisibilidadeLoader
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}