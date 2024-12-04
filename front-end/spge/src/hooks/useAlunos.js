import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import useTratarErro from "./useTratarErro";

const useAlunos = () => {

  const [alunos, setAlunos] = useState([]);
  const {codigoSalaParaOrdemAlfabeticaParam} = useParams();
  const {tratarErro} = useTratarErro();

  useEffect(() => {
    api.get("/aluno")
    .then((resp) => {
      setAlunos(resp.data);
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }, [])

  if(codigoSalaParaOrdemAlfabeticaParam){
    useEffect(() => {
      api.get("/aluno/listarAlunosDeUmaSalaEmOrdemAlfabetica/".concat(codigoSalaParaOrdemAlfabetica))
      .then((resp) => {
        console.log(resp.data);
        setAlunos(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  return{alunos};
}

export default useAlunos;