import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import FormAluno from '../../../components/forms/FormAluno';
import useAluno from "../../../hooks/useAluno";
import Loader from "../../../components/utils/Loader";

export default function EditarAluno(){

  const {aluno} = useAluno();

  console.log(aluno)

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={"/alunos"}
      />

      {
        aluno.codigo ? (
          <FormAluno/>
        ) : (
          <Loader/>
        )
      }
    </Container>
  )
}