import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from "../../../components/utils/BotaoLink";
import Card from "../../../components/utils/Card";
import ContainerDeCards from "../../../components/utils/ContainerDeCards";
import ListaDeEntidades from "../../../components/utils/ListaDeEntidades";
import useSalas from "../../../hooks/useSalas";

export default function Salas(){

  const {salas} = useSalas();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuFuncionario"}
      />

      <BotaoLink
        destino={"/criarSala"}
        msg={"Criar sala"}
      />

      <br /><br />

      <ListaDeEntidades
        entidade={salas}
        nomeEntidade={"salas"}
      >
        <ContainerDeCards>
          {
            salas.map((sala) => (
              <Card
                destino={"/sala/".concat(sala.codigo)}
                key={sala.codigo}
              >
                <h1>
                  {sala.periodo}
                  {sala.serie}{sala.turma}
                </h1>
              </Card>
            ))
          }
        </ContainerDeCards>
      </ListaDeEntidades>
    </Container>
  )
}