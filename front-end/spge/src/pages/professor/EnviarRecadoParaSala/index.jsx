import FormRecado from "../../../components/forms/FormRecado/imdex";
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import useRecado from "../../../hooks/useRecado";
import useRotas from "../../../hooks/useRotas";

export default function EnviarRecadoParaSala(){

  const {recado, preencherRecado, enviarFormularioEnviarRecadoParaSala} = useRecado();
  const {rotaPassada} = useRotas();

  return(
    <Container
      centralizar={true}
    >
      <HeaderVoltar
        destino={rotaPassada}
      />

      <FormRecado
        recado={recado}
        preencherRecado={preencherRecado}
        enviarFormulario={enviarFormularioEnviarRecadoParaSala}
      />
    </Container>
  )
}