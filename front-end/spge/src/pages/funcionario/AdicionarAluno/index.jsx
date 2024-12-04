import FormAluno from "../../../components/forms/FormAluno";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";

export default function AdicionarAluno(){


  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={"/alunos"}
      />

      <FormAluno/>
    </Container>
  )
}