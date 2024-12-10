import { useEffect, useState } from "react";
import useSessao from "./useSessao";
import api from "../services/api";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import rotasDeFuncionario from "../constants/rotasDeFuncionario";

const useSalas = () => {

  const [salas, setSalas] = useState([]);
  const {codigoProfessor} = useSessao();
  const {tratarErro} = useTratarErro();
  const {alterarVisibilidadeLoader} = useLoader();

  if(rotasDeFuncionario.includes(location.pathname)){
    useEffect(() => {
      api.get("/sala")
      .then((resp) => {
        setSalas(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  if(codigoProfessor){
    useEffect(() => {
      api.get("/professor/salas/".concat(codigoProfessor))
      .then((resp) => {
        setSalas(resp.data);
        alterarVisibilidadeLoader(resp.data.length);
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }, []);
  }

  return{salas};
}

export default useSalas;