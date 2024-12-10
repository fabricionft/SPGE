import FormAdicionarAlunoEmUmaSala from "../../../components/forms/FormAdicionarAlunoEmUmaSala";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import useRotas from "../../../hooks/useRotas";

export default function AdicionarAlunoEmUmaSala(){

  const {rotaPassada} = useRotas();

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={rotaPassada}
      />

      <FormAdicionarAlunoEmUmaSala/>
    </Container>
  )
}