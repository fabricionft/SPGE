import styles from './ContainerDeCards.module.css';

export default function ContainerDeCards({children}){

  return(
    <div className={styles.containerDeCards}>
      {children}
    </div>
  )
}