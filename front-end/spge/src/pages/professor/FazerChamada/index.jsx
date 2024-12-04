import FormFazerChamada from "../../../components/forms/FormFazerChamada";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from '../../../components/layout/HeaderVoltar';
import useRotas from '../../../hooks/useRotas';

export default function FazerChamada(){

  const {rotaPassada} = useRotas();

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={rotaPassada}
      />

      <FormFazerChamada/>
    </Container>
  )
}