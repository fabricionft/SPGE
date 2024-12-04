import { useContext } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { MessageBoxContext } from '../contexts/MessageBoxContext';


const useMessageBox = () => {

  const {messageBoxVisivel, exibir, esconder} = useContext(MessageBoxContext)
  const navigate = useNavigate();
  const location = useLocation();

  const exibirMessageBox = (destino, msg, type) => {  
    navigate((destino) ? destino : location.pathname, {
      state: {
        msg: msg,
        type: ["sucess", "error"][type],
        txtBotao:  ["Prosseguir", "Tentar novamente" ][type]
      }
    })
    exibir();
  }
  
  let dados = (location.state) && {
    tipo: location.state.type,
    msg: location.state.msg,
    txtBotao: location.state.txtBotao
  }

  return{messageBoxVisivel, esconder, exibirMessageBox, dados};
}

export default useMessageBox;