import Container from "../../../components/layout/Container/inde";
import Headervoltar from '../../../components/layout/HeaderVoltar';
import BoletimAluno from '../../../components/entidade/BoletimAluno';

export default function NotasAluno(){

  return(
    <Container>
      <Headervoltar
        destino={"/menuAluno"}
      />

      <BoletimAluno/>
    </Container>
  )
}