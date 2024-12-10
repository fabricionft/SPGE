import { useState } from "react";
import api from "../services/api";
import useMessageBox from "./useMessageBox";
import useTratarErro from "./useTratarErro";
import useLoader from "./useLoader";
import useMaterias from "./useMaterias";

const useMateria = () => {

  const [materia, setMateria] = useState({});
  const {exibirMessageBox} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();
  const {tratarErro} = useTratarErro();

  const preencherMateria = (e) => {
    setMateria({...materia, [e.target.name] : e.target.value});
  }

  const salvarMateria = () => {
    exibirCardLoader();
    api.post("/materia", {...materia})
    .then(() => {
      esconderCardLoader();
      exibirMessageBox(
        '/materias',
        "Matéria salva com sucesso!",
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const excluirMateria = (codigo) => {
    exibirCardLoader();
    api.delete("/materia/".concat(codigo))
    .then((resp) => {
      esconderCardLoader();
      exibirMessageBox(
        '',
        resp.data,
        0
      );
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }

  const enviarFormularioSalvarMateria = (e) => {
    e.preventDefault();
    salvarMateria();
  } 


  return{materia, preencherMateria, enviarFormularioSalvarMateria, excluirMateria};
}

export default useMateria;