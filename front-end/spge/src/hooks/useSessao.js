import { useContext } from "react";
import { SessaoContext } from "../contexts/SessaoContext";


const useSessao = () => {

  const {logar, deslogar, codigo} = useContext(SessaoContext); 

  return{logar, deslogar, codigo};
}

export default useSessao;