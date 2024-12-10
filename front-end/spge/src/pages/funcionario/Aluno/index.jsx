import BoletimAluno from "../../../components/entidade/BoletimAluno";
import InfoAluno from "../../../components/entidade/InfoAluno";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import useRotas from "../../../hooks/useRotas";

export default function Aluno(){

  const {rotaPassada} = useRotas();

  return(
    <Container>
      <HeaderVoltar
        destino={rotaPassada}
      />

      <InfoAluno/>

      <br /><br />

      <BoletimAluno/>
    </Container>
  )
}