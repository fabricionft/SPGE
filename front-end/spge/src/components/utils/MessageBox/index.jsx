import useMessageBox from '../../../hooks/useMessageBox';
import styles from './MessageBox.module.css';


export default function MessageBox(){

  const {messageBoxVisivel, esconder, dados} = useMessageBox();

  return(
    <>
      {
        messageBoxVisivel && (
          <div className={styles.sobreposicaoMessageBox}>
            <div className={styles.messageBox}>
              <div className={styles.margemMessageBox}>
                <p>
                  {
                    typeof(dados.msg) === "string" ? dados.msg :
                    dados.msg.map((erro, index) => (
                      <p
                        key={index}
                      >
                        {"- "+erro}
                      </p>
                    ))
                  }
                </p>

                <button
                  onClick={esconder}
                  className={styles[dados.tipo]}
                >
                  {dados.txtBotao}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}