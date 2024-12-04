import styles from './CardLoader.module.css';

//Assets
import gifLoading from '../../../assets/gifs/loading.gif';

//Hooks
import useLoader from "../../../hooks/useLoader"

export default function CardLoader(){

  const {visibilidadeCardLoader} = useLoader();

  return(
    <>
      {
        visibilidadeCardLoader && (
          <div className={styles.sobreposicaoCardLoader}>
            <div className={styles.cardLoader}>
              <img 
                src={gifLoading} 
                alt="Gif loading" 
              />
            </div>
          </div>
        )
      }
    </>
  )
}