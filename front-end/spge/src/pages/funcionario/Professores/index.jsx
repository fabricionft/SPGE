import styles from './Professores.module.css'


import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from "../../../components/utils/BotaoLink";
import useProfessores from '../../../hooks/useProfessores';
import formatarCPF from '../../../utils/formatarCPF';
import useProfessor from '../../../hooks/useProfessor';
import ListaDeEntidades from '../../../components/utils/ListaDeEntidades';


export default function Professores(){

  const {professores} = useProfessores();
  const {excluieProfessor} = useProfessor();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuFuncionario"}
      />

      <BotaoLink
        destino={"/adicionarProfessor"}
        msg={"Adicionar professor"}
      />

      <ListaDeEntidades
        entidade={professores}
        nomeEntidade={"profesores"}
      >
        <div className={styles.painelProfessores}>
          <div className={styles.margemPainelProfessores}>
            <div className={styles.professorLegenda}>
              <div>
                <p>ID</p>
              </div>

              <div>
                <p>Nome</p>
              </div>

              <div>
                <p>CPF</p>
              </div>

              <div>
                <p>Matéria</p>
              </div>

              <div>
                <p>Ações</p>
              </div>
            </div>

            {
              professores.map((professor, index) => (
                <div
                  key={professor.codigo}
                  className={styles.professor+" "+[(index % 2 == 0) && "par"]}
                >
                  <div>
                    <p>{professor.codigo}</p>
                  </div>

                  <div>
                    <p>{professor.nome}</p>
                  </div>

                  <div>
                    <p>{formatarCPF(professor.cpf)}</p>
                  </div>

                  <div>
                    <p>
                      {
                        professor.materia.length > 4 ? professor.materia.substring(0, 4).toUpperCase()
                        : professor.materia.toUpperCase()
                      }
                    </p>
                  </div>

                  <div>
                    <BotaoLink
                      msg={"Dados"}
                      margemNaDireia={true}
                    />

                    <BotaoLink
                      destino={"/editarProfessor/".concat(professor.codigo)}
                      msg={"Editar"}
                      margemNaDireia={true}
                    />

                    <button
                      onClick={() => excluieProfessor(professor.codigo)}
                    >
                      Excluir
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