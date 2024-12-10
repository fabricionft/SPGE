import FormProfessor from "../../../components/forms/FormProfessor";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";

export default function EditarProfessor(){


  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={"/professores"}
      />

      <FormProfessor/>
    </Container>
  )
}