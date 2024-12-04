import BoletimAluno from "../../../components/entidade/BoletimAluno";
import InfoAluno from "../../../components/entidade/InfoAluno";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";

export default function Aluno(){

  return(
    <Container>
      <HeaderVoltar
        destino={"/alunos"}
      />

      <InfoAluno/>

      <br /><br />

      <BoletimAluno/>
    </Container>
  )
}