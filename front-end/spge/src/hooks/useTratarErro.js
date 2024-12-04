import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";

const useTratarErro = () => {

  const {exibirMessageBox} = useMessageBox();
  const {esconderCardLoader} = useLoader();

  const tratarErro = (destino, error) => {
    exibirMessageBox(
      destino,
      error.response.data.message,
      1
    );
    esconderCardLoader();
  }

  return{tratarErro};
}

export default useTratarErro;