import styles from './InfoAluno.module.css';

import useAluno from '../../../hooks/useAluno';
import Loader from '../../utils/Loader';

export default function InfoAluno(){

  const {dadosAluno} = useAluno();

  return(
    <>
      {
        dadosAluno ? (
          <div className={styles.painelDados}>
            <div className={styles.margemPainelDados}>
              <div className={styles.divisor}>
                <p>Nome</p>
                <p>{dadosAluno.nome}</p>
              </div>

              <div className={styles.divisor}>
                <p>Sala</p>
                <p>{dadosAluno.sala}</p>
              </div>

              <div className={styles.divisor}>
                <p>RG</p>
                <p>{dadosAluno.rg}</p>
              </div>

              <div className={styles.divisor}>
                <p>CPF</p>
                <p>{dadosAluno.cpf}</p>
              </div>

              <div className={styles.divisor}>
                <p>Mãe</p>
                <p>{dadosAluno.nomeDaMae}</p>
              </div>

              <div className={styles.divisor}>
                <p>Pai</p>
                <p>{dadosAluno.nomeDoPai}</p>
              </div>

              <div className={styles.divisor}>
                <p>Data de nascimento</p>
                <p>{(dadosAluno.dia < 10) && "0"}{dadosAluno.dia}/{(dadosAluno.mes < 10) && "0"}{dadosAluno.mes}/{dadosAluno.ano}</p>
              </div>

              <div className={styles.divisor}>
                <p>RA</p>
                <p>{dadosAluno.ra}</p>
              </div>

              <div className={styles.divisor}>
                <p>Matricula</p>
                <p>{dadosAluno.matricula}</p>
              </div>

              <div className={styles.divisor}>
                <p>Email</p>
                <p>{dadosAluno.email}</p>
              </div>

              <div className={styles.divisor}>
                <p>Endereço</p>
                <p>({dadosAluno.cep}) - {dadosAluno.cidade}-{dadosAluno.estado}, {dadosAluno.bairro}, {dadosAluno.rua} - {dadosAluno.numero}, {dadosAluno.complemento}</p>
              </div>
            </div>
          </div>
        ) : (
          <Loader/>
        )
      }
    </>
  )
}