import { createContext, useEffect, useState } from "react";

export const SessaoContext = createContext();


export const SessaoProvider = ({children}) => {

  //SESSÃO ALUNO
  const [sessaoAluno, setSessaoAluno] = useState(() => {
    let sessaoAluno = localStorage.getItem('sessaoAluno');
    return (sessaoAluno) ? JSON.parse(sessaoAluno) : false;
  })

  useEffect(() => {
    localStorage.setItem('sessaoAluno', JSON.stringify(sessaoAluno));
  }, [sessaoAluno]);

  const logarAluno = (sessaoAluno) => {setSessaoAluno(sessaoAluno);}
  const deslogarAluno = () => setSessaoAluno(false);

  let codigoAluno = sessaoAluno.codigo;


  //SESSÃO PROFESSOR
  const [sessaoProfessor, setSessaoProfessor] = useState(() => {
    let sessaoProfessor = localStorage.getItem('sessaoProfessor');
    return (sessaoProfessor) ? JSON.parse(sessaoProfessor) : false;
  })

  useEffect(() => {
    localStorage.setItem('sessaoProfessor', JSON.stringify(sessaoProfessor));
  }, [sessaoProfessor]);

  const logarProfessor = (sessaoProfessor) => {setSessaoProfessor(sessaoProfessor);}
  const deslogarProfessor = () => setSessaoProfessor(false);

  let codigoProfessor = sessaoProfessor.codigo;
  let nomeProfessor = sessaoProfessor.nome;
  let materiaProfessor = sessaoProfessor.materia;


  //SESSÃO FUNCIONÁRIO
  const [sessaoFuncionario, setSessaoFuncionario] = useState(() => {
    let sessaoFuncionario = localStorage.getItem('sessaoFuncionario');
    return (sessaoFuncionario) ? JSON.parse(sessaoFuncionario) : false;
  })

  useEffect(() => {
    localStorage.setItem('sessaoFuncionario', JSON.stringify(sessaoFuncionario));
  }, [sessaoFuncionario]);

  const logarFuncionario = (sessaoFuncionario) => {setSessaoFuncionario(sessaoFuncionario);}
  const deslogarFuncionario = () => setSessaoFuncionario(false);

  let codigoFuncionario = sessaoFuncionario.codigo;
  

  return(
    <SessaoContext.Provider
      value={{
        logarAluno, deslogarAluno, sessaoAluno, codigoAluno,
        logarProfessor, deslogarProfessor, sessaoProfessor, codigoProfessor, nomeProfessor, materiaProfessor,
        logarFuncionario, deslogarFuncionario, sessaoFuncionario, codigoFuncionario
      }}
    >
      {children}
    </SessaoContext.Provider>
  )
}