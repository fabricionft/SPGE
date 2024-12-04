import { useParams } from "react-router-dom";
import FormDefinirNota from "../../../components/forms/FormDefinirNota";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import useRotas from "../../../hooks/useRotas";

export default function DefinirNota(){

  const {codigoAluno} = useParams();
  const {rotaPassada} = useRotas();

  console.log(codigoAluno);

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={rotaPassada}
      />

      <FormDefinirNota/>
    </Container>
  )
}