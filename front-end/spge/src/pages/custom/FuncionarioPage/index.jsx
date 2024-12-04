import useRotas from "../../../hooks/useRotas";
import useSessao from "../../../hooks/useSessao"

export default function FuncionarioPage({children}){

  const {sessaoFuncionario} = useSessao();
  const {bloquearRotaDeFuncionario} = useRotas();

  bloquearRotaDeFuncionario();

  return(
    <>
      {sessaoFuncionario && children}
    </>
  )
}