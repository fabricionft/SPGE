import styles from './MenuProfessor.module.css';


import Container from "../../../components/layout/Container/inde";
import Card from "../../../components/utils/Card";
import ContainerDeCards from "../../../components/utils/ContainerDeCards";
import ListaDeEntidades from "../../../components/utils/ListaDeEntidades";
import useSalas from "../../../hooks/useSalas";
import iconPessoas from '../../../assets/icons/pessoas.png';

export default function MenuProfessor(){

  const {salas} = useSalas();

  return(
    <Container>
      <ContainerDeCards>
        <ListaDeEntidades
          entidade={salas}
          nomeEntidade={"salas"}
        >
          <>
            {
              salas.map((sala) => (
                <Card
                  key={sala.codigo}
                  destino={"/salaDoProfessor/".concat(sala.codigo)}
                >
                  <div className={styles.numeroDeAlunos}>
                    <p>
                      {sala.quantidadeDeAlunos}
                    </p>

                    <img 
                      src={iconPessoas} 
                      alt="Icon pessoas" 
                    />
                  </div>
                  <h1 className={styles.nomeSala}>
                    {sala.serie}
                    {sala.turma}
                  </h1>
                </Card>
              ))
            } 
          </>
        </ListaDeEntidades>
      </ContainerDeCards>
    </Container>
  )
}

/*
{
          salas.length ? (
            <>
              {
                salas.map((sala) => (
                  <Card
                    key={sala.codigo}
                    destino={"/salaDoProfessor/".concat(sala.codigo)}
                  >
                    <strong>
                      <h1>
                        {sala.serie}
                        {sala.turma}
                      </h1>
                    </strong>
                  </Card>
                ))
              } 
            </>
          ) : visibilidadeLoader ? (
            <Loader/>
          ) : (
            <p>Sem alunos até o momento</p>
          )
        }*/