import useRotas from "../../../hooks/useRotas"
import useSessao from "../../../hooks/useSessao";

export default function ProfessorPage({children}){

  const {sessaoProfessor} = useSessao();
  const {bloquearRotaDeProfessor} = useRotas();

  bloquearRotaDeProfessor();

  return(
    <>
      {sessaoProfessor && children}
    </>
  )
}