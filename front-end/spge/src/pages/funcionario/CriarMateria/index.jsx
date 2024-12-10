import FormCriarMateria from "../../../components/forms/FormCriarMateria";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";

export default function CriarMateria(){

  return(
    <>
      <Container
        centralizar={true}
      >
        <HeaderVoltar
          destino={"/materias"}
        />

        <FormCriarMateria/>
      </Container>
    </>
  )
}