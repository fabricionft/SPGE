import styles from './SalaDoProfessor.module.css';
import Container from "../../../components/layout/Container/inde";
import useSala from "../../../hooks/useSala";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from '../../../components/utils/BotaoLink';
import useSessao from '../../../hooks/useSessao';
import Loader from '../../../components/utils/Loader';
import ListaDeEntidades from '../../../components/utils/ListaDeEntidades';
import { useState } from 'react';

export default function SalaDoProfessor(){

  //const {id} = useParams();
  const {sala} = useSala();
  const {materiaProfessor} = useSessao();
  const [exibirConteudo, setExibirConteudo] = useState("alunos");

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuProfessor"}
      />

      {
        sala.codigo ? (
          <>
            <h1 className={styles.nomeDaSala}>{sala.serie}{sala.turma} - {materiaProfessor}</h1>

            <div className={styles.botoesSala}>
              <BotaoLink
                destino={"/fazerChamada/".concat(sala.codigo)}
                msg={"Fazer chamada"}
              />
              
              <BotaoLink
                destino={"/fazerChamada/".concat(sala.codigo)}
                msg={"Enviar recado geral"}
              />
            </div>

            <div className={styles.atalhosSala}>
              <p 
                className={styles[(exibirConteudo == "alunos") && "selecionado"]}
                onClick={() => setExibirConteudo('alunos')}  
              >
                Alunos
              </p>

              <p
                className={styles[(exibirConteudo == "recados") && "selecionado"]}
                onClick={() => setExibirConteudo('recados')}  
              >
                Recados
              </p>

              <p
                className={styles[(exibirConteudo == "aulas") && "selecionado"]}
                onClick={() => setExibirConteudo('aulas')}  
              >
                Aulas
              </p>
            </div>

            {
              exibirConteudo == "alunos" ? (
                <ListaDeEntidades
                  entidade={sala.alunos}
                  nomeEntidade={"alunos"}
                >
                  <div className={styles.painelAlunos}>
                    <div className={styles.margemPainelAlunos}>
                      
                    <div className={styles.alunoLegenda}>
                        <div className={styles.divisorAluno}>
                          <p>ID</p>
                        </div>

                        <div className={styles.divisorAluno}>
                          <p>Nome</p>
                        </div>

                        <div className={styles.divisorAluno}>
                          <p>RA</p>
                        </div>

                        <div className={styles.divisorAluno}>
                          <p>Notas na matéria</p>
                        </div>

                        <div className={styles.divisorBotoesAluno}>
                          <p>Ações</p>
                        </div>
                      </div>

                      {
                        sala.alunos.map((aluno, index) => (
                          <div
                            key={aluno.codigo}
                            className={styles.aluno+" "+styles[(index % 2 == 0) && "par"]}
                          >
                            <div className={styles.divisorAluno}>
                              <strong>{index+1}</strong>
                            </div>

                            <div className={styles.divisorAluno}>
                              <p>
                                {
                                  (aluno.nome.split(" ").length > 1) 
                                    ? aluno.nome.split(" ")[0]+" "+aluno.nome.split(" ")[1].substring(0, 1)+"." 
                                    : aluno.nome
                                }
                              </p>
                            </div>

                            <div className={styles.divisorAluno}>
                              <p>{aluno.ra}</p>
                            </div>

                            <div className={styles.divisorAluno}>
                              {
                                aluno.historicoDeDesempenho.map((bimestre) => (
                                  <p key={bimestre.codigo}>
                                    {bimestre.desempenho.find((desempenho) => desempenho.materia == materiaProfessor).nota.toFixed(1)}
                                  </p>
                                ))
                              }
                            </div>

                            <div className={styles.divisorBotoesAluno}>
                              <BotaoLink
                                destino={"/definirNota/".concat(aluno.codigo)}
                                msg={"Definir nota"}
                              />

                              <BotaoLink
                                destino={"/definirNota/".concat(aluno.codigo)}
                                msg={"Recado individual"}
                              />
                            </div>
                          </div>
                        ))
                      }
                    </div>  
                  </div>  
                </ListaDeEntidades>
              ) : exibirConteudo == "recados" ? (
                <>Recados</>
              ) : exibirConteudo == "aulas" && (
                <>Aulas</>
              )
            }
             
          </>
        ) : (
          <Loader/>
        )
      }
    </Container>
  )
}