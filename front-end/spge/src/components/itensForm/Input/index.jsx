import { useLocation } from "react-router-dom"

export default function Input({dica, nome, preencherEntidade, entidade, maximoDeCaracteres, rotaASerBloqueada}){

  const rotaAtual = "/"+useLocation().pathname.split("/")[1];

  return(
    <input 
      type="text"
      placeholder={dica}
      name={nome}
      onChange={(e) => preencherEntidade(e)}
      value={entidade || ""}
      maxLength={maximoDeCaracteres}
      readOnly={rotaASerBloqueada === rotaAtual}
    />
  )
}