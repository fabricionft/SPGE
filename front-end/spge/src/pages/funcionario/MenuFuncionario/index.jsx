import Container from "../../../components/layout/Container/inde";
import ContainerDeCards from '../../../components/utils/ContainerDeCards';
import Card from '../../../components/utils/Card';

export default function MenuFuncionario(){

  return(
    <Container>
      <ContainerDeCards>
        <Card
          destino={"/materias"}
        >
          <h1>Matérias</h1>
        </Card>

        <Card
          destino={"/salas"}
        >
          <h1>Salas</h1>
        </Card>

        <Card
          destino={"/professores"}
        >
          <h1>Professores</h1>
        </Card>

        <Card
          destino={"/alunos"}
        >
          <h1>Alunos</h1>
        </Card>
      </ContainerDeCards>
    </Container>
  )
}