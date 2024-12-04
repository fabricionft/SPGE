import FormLogin from "../../../components/forms/FormLoginAluno";
import Container from "../../../components/layout/Container/inde";
import useRotas from "../../../hooks/useRotas";

export default function LoginAluno(){

  const {bloquearRotaPublica} = useRotas();

  bloquearRotaPublica();

  return(
    <Container
      centralizar={true}
    >
      <FormLogin

      />
    </Container>
  )
}