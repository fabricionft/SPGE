import FormCriarSala from "../../../components/forms/FormCriarSala";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";

export default function CriarSala(){


  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={"/salas"}
      />

      <FormCriarSala/>
    </Container>
  )
}