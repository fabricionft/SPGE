import { useEffect } from "react";
import rotasPrivadas from "../constants/rotasPrivadas";
import rotasPublicas from "../constants/rotasPublicas";
import useSessao from "./useSessao";

import {useLocation, useNavigate} from 'react-router-dom'


const useRotas = () => {

  const {codigo} = useSessao();
  const location = useLocation();
  const navigate = useNavigate();

  const verificarSeERotaPublica = () => {
    return rotasPublicas.includes(location.pathname);
  }

  const verificarSeERotaPrivada = () => {
    return rotasPrivadas.includes(location.pathname);
  }

  const bloquearRotaPublica = () => {
    useEffect(() => {
      if(codigo !== undefined){
        navigate("/")
      }
    }, [location.pathname]);
  }

  const bloquearRotaPrivada = () => {
    useEffect(() => {
      if(codigo == undefined){
        navigate("/")
      }
    }, [location.pathname]);
  }


  return{verificarSeERotaPublica, verificarSeERotaPrivada, bloquearRotaPublica, bloquearRotaPrivada};
}

export default useRotas;