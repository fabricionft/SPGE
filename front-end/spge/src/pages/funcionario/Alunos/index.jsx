import styles from './Alunos.module.css';

import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from "../../../components/utils/BotaoLink";
import ListaDeEntidades from '../../../components/utils/ListaDeEntidades';
import useAlunos from '../../../hooks/useAlunos';
import useAluno from '../../../hooks/useAluno';

export default function Alunos(){

  const {alunos} = useAlunos();
  const {excluirAluno} = useAluno();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuFuncionario"}
      />

      <BotaoLink
        destino={"/adicionarAluno"}
        msg={"Adcionar Aluno"}
      />

      <ListaDeEntidades
        entidade={alunos}
        nomeEntidade={"alunos"}
      >
        <div className={styles.painelAlunos}>
          <div className={styles.margemPainelAlunos}>
            <div className={styles.alunoLegenda}>
              <div className={styles.divisor1}>
                <p>ID</p>
              </div>

              <div className={styles.divisor2}>
                <p>Nome</p>
              </div>

              <div className={styles.divisor3}>
                <p>RA</p>
              </div>

              <div className={styles.divisor4}>
                <p>Sala</p>
              </div>

              <div className={styles.divisor5}>
                <p>Ações</p>
              </div>
            </div>

            {
              alunos.map((aluno) => (
                <div
                  key={aluno.codigo}
                  className={styles.aluno}
                >
                  <div className={styles.divisor1}>
                    <p>{aluno.codigo}</p>
                  </div>

                  <div className={styles.divisor2}>
                    <p>{aluno.nome}</p>
                  </div>

                  <div className={styles.divisor3}>
                    <p>{aluno.ra}</p>
                  </div>

                  <div className={styles.divisor4}>
                    <p>{aluno.sala}</p>
                  </div>

                  <div className={styles.divisor5}>
                    <BotaoLink
                      destino={"/aluno/".concat(aluno.codigo)}
                      msg={"Ver dados"}
                    />

                    <BotaoLink
                      destino={"/editarAluno/".concat(aluno.codigo)}
                      msg={"Editar"}
                    />

                    <button
                      type='button'
                      onClick={() => excluirAluno(aluno.codigo)}
                    >
                      Ezcluir
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </ListaDeEntidades>
    </Container>
  )
}