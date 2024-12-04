import { createContext, useState } from "react";

export const MessageBoxContext = createContext();

export const MessageBoxProvider = ({children}) => {

  const [messageBoxVisivel, setMessageBoxVisivel] = useState(false);

  const exibir = () => {setMessageBoxVisivel(true);}
  const esconder = () => {setMessageBoxVisivel(false)};

  return(
    <MessageBoxContext.Provider
      value={{messageBoxVisivel, exibir, esconder}}
    >
      {children}
    </MessageBoxContext.Provider>
  )
}