import { useEffect, useState } from "react";
import rotasPublicas from "../constants/rotasPublicas";
import useSessao from "./useSessao";

import {useLocation, useNavigate} from 'react-router-dom'
import rotasDeAluno from "../constants/rotasDeAluno";
import rotasDeProfessor from "../constants/rotasDeProfessor";
import rotasDeFuncionario from "../constants/rotasDeFuncionario";


const useRotas = () => {

  const {sessaoAluno, sessaoProfessor,sessaoFuncionario} = useSessao();
  const location = useLocation();
  const navigate = useNavigate();

  const verificarSeERotaPublica = () => {
    return rotasPublicas.includes(location.pathname);
  }

  const verificarSeEDeAluno = () => {
    return rotasDeAluno.includes("/".concat(location.pathname.split('/')[1]));
  }
  
  const verificarSeEDeProfessor = () => {
    return rotasDeProfessor.includes("/".concat(location.pathname.split('/')[1]));
  }

  const verificarSeEDeFuncionario = () => {
    return rotasDeFuncionario.includes("/".concat(location.pathname.split('/')[1]));
  }

  const bloquearRotaPublica = () => {
    useEffect(() => {
      if(sessaoAluno){
        navigate("/")
      }
    }, [location.pathname]);
  }

  const bloquearRotaDeAluno = () => {
    useEffect(() => {
      if(!sessaoAluno){
        navigate("/")
      }
    }, [location.pathname, sessaoAluno]);
  }

  const bloquearRotaDeProfessor = () => {
    useEffect(() => {
      if(!sessaoProfessor){
        navigate("/")
      }
    }, [location.pathname, sessaoProfessor]);
  }

  const bloquearRotaDeFuncionario = () => {
    useEffect(() => {
      if(!sessaoFuncionario){
        navigate("/")
      }
    }, [location.pathname, sessaoFuncionario]);
  }

  const rotaPassada = (localStorage.getItem('rotaPassada')) ? localStorage.getItem('rotaPassada') : "/";

  const marcarRotaPassada = () => {
    localStorage.setItem('rotaPassada', location.pathname);
  }

  return{
    verificarSeERotaPublica, bloquearRotaPublica, 
    verificarSeEDeAluno, bloquearRotaDeAluno,
    verificarSeEDeProfessor, bloquearRotaDeProfessor,
    verificarSeEDeFuncionario, bloquearRotaDeFuncionario,
    rotaPassada, marcarRotaPassada
  };
}

export default useRotas;