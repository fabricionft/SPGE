import styles from './Materias.module.css';

import Container from "../../../components/layout/Container/inde";
import HeaderVoltar from "../../../components/layout/HeaderVoltar";
import BotaoLink from "../../../components/utils/BotaoLink";
import useMaterias from '../../../hooks/useMaterias';
import useMateria from '../../../hooks/useMateria';

export default function Materias(){

  const {materias} = useMaterias();
  const {excluirMateria} = useMateria();

  return(
    <Container>
      <HeaderVoltar
        destino={"/menuFuncionario"}
      />

      <BotaoLink
        destino={"/criarMateria"}
        msg={"Criar matéria"}
      />

      <div className={styles.painelMaterias}>
        <div className={styles.margemPainelMaterias}>
          <div className={styles.materiaLegenda}>
            <div>
              <p>ID</p>
            </div>
            
            <div>
              <p>Matéria</p>
            </div>

            <div>
              <p>Ações</p>
            </div>
          </div>

          {
            materias.map((materia, index) => (
              <div
                key={materia.codigo}
                className={styles.materia+" "+[(index % 2 == 0) && "par"]}
              >
                <div>
                  <p>{materia.codigo}</p>
                </div>
                
                <div>
                  <p>{materia.materia}</p>
                </div>

                <div>
                  <button
                    type='button'
                    onClick={() => excluirMateria(materia.codigo)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
}