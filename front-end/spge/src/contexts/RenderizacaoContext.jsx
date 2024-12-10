import { createContext, useState } from "react";

export const RenderizacaoContext = createContext();

export const RenderizacaoProvider = ({children}) => {

  const [renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo] = useState("recados");

  return(
    <RenderizacaoContext.Provider
      value={{renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo}}
    >
      {children}
    </RenderizacaoContext.Provider>
  )
}