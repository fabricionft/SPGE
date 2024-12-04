import Container from "../../../components/layout/Container/inde";
import InfoAluno from '../../../components/entidade/InfoAluno';

import Headervoltar from '../../../components/layout/HeaderVoltar';

export default function DadosAluno(){


  return(
    <Container>
      <Headervoltar
        destino={"/menuAluno"}
      />

      <InfoAluno/>
    </Container>
  )
}