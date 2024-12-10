import { useContext } from "react";
import { SessaoContext } from "../contexts/SessaoContext";


const useSessao = () => {

  const {
    logarAluno, deslogarAluno, sessaoAluno, codigoAluno,
    logarProfessor, deslogarProfessor, sessaoProfessor, codigoProfessor, nomeProfessor, materiaProfessor,
    logarFuncionario, deslogarFuncionario, sessaoFuncionario, codigoFuncionario
  } = useContext(SessaoContext); 

  return{
    logarAluno, deslogarAluno, sessaoAluno, codigoAluno,
    logarProfessor, deslogarProfessor, sessaoProfessor, codigoProfessor, nomeProfessor, materiaProfessor,
    logarFuncionario, deslogarFuncionario, sessaoFuncionario, codigoFuncionario
  };
}

export default useSessao;