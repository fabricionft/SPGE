import styles from './SalaDoProfessor.module.css';
import Container from "../../../components/layout/Container/inde";
import useSala from "../../../hooks/useSala";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from '../../../components/utils/BotaoLink';
import useSessao from '../../../hooks/useSessao';
import Loader from '../../../components/utils/Loader';
import ListaDeEntidades from '../../../components/utils/ListaDeEntidades';
import { useState } from 'react';
import useAlunos from '../../../hooks/useAlunos';
import useRenderizacao from '../../../hooks/useRenderizacao';
import useRecados from '../../../hooks/useRecados';
import ListaDeRecados from '../../../components/utils/ListaDeRecados';
import useAulaa from '../../../hooks/useAulas';
import ListaDeAulas from '../../../components/utils/ListaDeAulas';
import ContainerDeBotoes from '../../../components/utils/ContainerDeBotoes';

export default function SalaDoProfessor(){

  //const {id} = useParams();
  const {sala} = useSala();
  const {materiaProfessor} = useSessao();
  const {alunos} = useAlunos();
  const {renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo} = useRenderizacao();
  const {recados} = useRecados();
  const {aulas} = useAulaa();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuProfessor"}
      />

      {
        sala.codigo ? (
          <>
            <h1 className={styles.nomeDaSala}>{sala.serie}{sala.turma} - {materiaProfessor}</h1>

            <ContainerDeBotoes>
              <BotaoLink
                  destino={"/fazerChamada/".concat(sala.codigo)}
                  msg={"Fazer chamada"}
                  margemNaDireia={true}
                  margemEmBaixo={true}
                />
                
                <BotaoLink
                  destino={"/enviarRecadoParaSala/".concat(sala.codigo)}
                  msg={"Enviar recado geral"}
                />
            </ContainerDeBotoes>

            <div className={styles.atalhosSala}>
              <p 
                className={styles[(renderizarDeterminadoConteudo == "alunos") && "selecionado"]}
                onClick={() => setRenderizarDeterminadoConteudo('alunos')}  
              >
                Alunos
              </p>

              <p
                className={styles[(renderizarDeterminadoConteudo == "recados") && "selecionado"]}
                onClick={() => setRenderizarDeterminadoConteudo('recados')}  
              >
                Recados
              </p>

              <p
                className={styles[(renderizarDeterminadoConteudo == "aulas") && "selecionado"]}
                onClick={() => setRenderizarDeterminadoConteudo('aulas')}  
              >
                Aulas
              </p>
            </div>

            {
              renderizarDeterminadoConteudo == "alunos" ? (
                <ListaDeEntidades
                  entidade={alunos}
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
                        alunos.map((aluno, index) => (
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
                                destino={"/enviarRecadoParaAluno/".concat(aluno.codigo)}
                                msg={"Recado individual"}
                              />
                            </div>
                          </div>
                        ))
                      }
                    </div>  
                  </div>  
                </ListaDeEntidades>
              ) : renderizarDeterminadoConteudo == "recados" ? (
                <ListaDeRecados
                  recados={recados}
                />
              ) : renderizarDeterminadoConteudo == "aulas" && (
                <ListaDeAulas
                  aulas={aulas}
                />
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