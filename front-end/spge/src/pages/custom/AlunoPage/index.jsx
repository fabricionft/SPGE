import useRotas from "../../../hooks/useRotas"
import useSessao from "../../../hooks/useSessao";

export default function AlunoPage({children}){

  const {bloquearRotaDeAluno} = useRotas();
  const {sessaoAluno} = useSessao();

  bloquearRotaDeAluno();

  return(
    <>
      {sessaoAluno && children}
    </>
  )
}