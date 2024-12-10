import FormAdicionarProfessorEmUmaSala from "../../../components/forms/FormAdicionarProfessorEmUmaSala";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import useRotas from "../../../hooks/useRotas";

export default function AdicionarProfessorEmUmaSala(){

  const {rotaPassada} = useRotas();

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={rotaPassada}
      />

      <FormAdicionarProfessorEmUmaSala/>
    </Container>
  )
}