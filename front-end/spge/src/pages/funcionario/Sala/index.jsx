import styles from './Sala.module.css';

import { useParams } from "react-router-dom"
import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from "../../../components/utils/BotaoLink";
import useAlunos from '../../../hooks/useAlunos';
import ListaDeEntidades from '../../../components/utils/ListaDeEntidades';
import useSala from '../../../hooks/useSala';
import ContainerDeBotoes from '../../../components/utils/ContainerDeBotoes';
import useProfessores from '../../../hooks/useProfessores';
import useRenderizacao from '../../../hooks/useRenderizacao';


export default function Sala(){

  const {sala, removerAlunoDeUmaSala, removerProfessorDeUmaSala} = useSala();
  const {alunos} = useAlunos();
  const {professores} = useProfessores();
  const {renderizarDeterminadoConteudo, setRenderizarDeterminadoConteudo} = useRenderizacao();

  console.log(alunos)
  console.log(professores)

  return(
    <Container>
      <HeaderVoltar
        destino={"/salas"}
      />

      <h1 className={styles.nomeDaSala}>{sala.serie}{sala.turma} - {sala.periodo}</h1>

      <ContainerDeBotoes>
        <BotaoLink
          msg={"Adcionar aluno"}
          destino={"/AdicionarAlunoEmUmaSala/".concat(sala.codigo)}
          margemNaDireia={true}
          margemEmBaixo={true}
        />

        <BotaoLink
          msg={"Adcionar professor"}
          destino={"/adicionarProfessorEmUmaSala/".concat(sala.codigo)}
        />
      </ContainerDeBotoes>

      <div className={styles.atalhosSala}>
        <p
          className={styles[(renderizarDeterminadoConteudo == "alunos") && "selecionado"]}
          onClick={() => setRenderizarDeterminadoConteudo("alunos")}
        >
          Alunos
        </p>

        <p
          className={styles[(renderizarDeterminadoConteudo == "professores") && "selecionado"]}
          onClick={() => setRenderizarDeterminadoConteudo("professores")}
        >
          Professores
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
                <div
                  className={styles.aluno}
                >
                  <div>
                    <p>ID</p>
                  </div>

                  <div>
                    <p>Nome</p>
                  </div>

                  <div>
                    <p>RA</p>
                  </div>

                  <div>
                    <p>Ações</p>
                  </div>
                </div>

                {
                  alunos.map((aluno) => (
                    <div
                      className={styles.aluno}
                      key={aluno.codigo}
                    >
                      <div>
                        <p>{aluno.codigo}</p>
                      </div>

                      <div>
                        <p>{aluno.nome}</p>
                      </div>

                      <div>
                        <p>{aluno.ra}</p>
                      </div>

                      <div>
                        <BotaoLink
                          destino={"/aluno/".concat(aluno.codigo)}
                          msg={"Dados"}
                          margemNaDireia={true}
                        />

                        <button
                          type='button'
                          onClick={() => removerAlunoDeUmaSala(sala.codigo, aluno.codigo)}
                        >
                          Remover da sala
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </ListaDeEntidades>
        ) : renderizarDeterminadoConteudo == "professores" && (
          <ListaDeEntidades
            entidade={professores}
            nomeEntidade={"professores"} 
          >
            <div className={styles.painelAlunos}>
              <div className={styles.margemPainelAlunos}>
                <div
                  className={styles.aluno}
                >
                  <div>
                    <p>ID</p>
                  </div>

                  <div>
                    <p>Nome</p>
                  </div>

                  <div>
                    <p>Materia</p>
                  </div>

                  <div>
                    <p>Ações</p>
                  </div>
                </div>

                {
                  professores.map((professor) => (
                    <div
                      className={styles.professor}
                      key={professor.codigo}
                    >
                      <div>
                        <p>{professor.codigo}</p>
                      </div>

                      <div>
                        <p>{professor.nome}</p>
                      </div>

                      <div>
                        <p>{professor.materia.substring(0,4).toUpperCase()}</p>
                      </div>

                      <div>
                        <BotaoLink
                          destino={"/professor/".concat(professor.codigo)}
                          msg={"Dados"}
                          margemNaDireia={true}
                        />

                        <button
                          type='button'
                          onClick={() => removerProfessorDeUmaSala(sala.codigo, professor.codigo)}
                        >
                          Remover da sala
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </ListaDeEntidades>
        )
      }
    </Container>
  )
}