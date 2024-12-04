import { useLocation } from "react-router-dom";

export default function InputNumerico({maximoDeCaracteres, dica, valorMaximo, nome, preencherEntidade, entidade, rotaASerBloqueada}){

  const rotaAtual = "/"+useLocation().pathname.split("/")[1];

  return(
    <input 
      type="number" 
      placeholder={dica}
      max={valorMaximo}
      name={nome}
      onChange={(e) => {
        (!entidade) ? preencherEntidade(e) 
        : (e.target.value.length <=  maximoDeCaracteres) && preencherEntidade(e)
      }}
      value={entidade || ""}  
      readOnly={rotaASerBloqueada === rotaAtual}
    />
  )
}