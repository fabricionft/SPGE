import { createContext, useEffect, useState } from "react";

export const SessaoContext = createContext();


export const SessaoProvider = ({children}) => {

  const [sessao, setSessao] = useState(() => {
    let sessao = localStorage.getItem('sessaoAluno');
    return (sessao) ? JSON.parse(sessao) : false;
  })

  useEffect(() => {
    localStorage.setItem('sessaoAluno', JSON.stringify(sessao));
  }, [sessao]);

  const logar = (sessao) => {setSessao(sessao);}
  const deslogar = () => setSessao(false);

  let codigo = sessao.codigo;

  return(
    <SessaoContext.Provider
      value={{logar, deslogar, codigo}}
    >
      {children}
    </SessaoContext.Provider>
  )
}