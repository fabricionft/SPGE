export default function Input({dica, nome, preencherEntidade, entidade}){

  return(
    <input 
      type="text"
      placeholder={dica}
      name={nome}
      onChange={(e) => preencherEntidade(e)}
      value={entidade || ""}
    />
  )
}