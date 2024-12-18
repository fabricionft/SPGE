import { useEffect, useState } from "react";
import api from "../services/api";
import useTratarErro from "./useTratarErro";

const useMaterias = () => {

  const [materias, setMaterias] = useState([]);
  const {tratarErro} = useTratarErro();

  useEffect(() => {
    api.get("/materia")
    .then((resp) => {
      setMaterias(resp.data);
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }, []);

  return{materias};
}

export default useMaterias;