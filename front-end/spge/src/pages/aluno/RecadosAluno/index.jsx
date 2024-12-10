import Container from "../../../components/layout/Container/inde";
import ListaDeRecados from '../../..//components/utils/ListaDeRecados';
import useRecados from '../../../hooks/useRecados';
import HeaderVoltar from '../../../components/layout/HeaderVoltar';

export default function RecadosAluno(){

  const {recados} = useRecados();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuAluno"}
      />

      <ListaDeRecados
        recados={recados}
      />
    </Container>
  )
}