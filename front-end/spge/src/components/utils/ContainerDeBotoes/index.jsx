import styles from './ContainerDeBotoes.module.css';


export default function ContainerDeBotoes({children}){

  return(
    <div className={styles.containerBotoes}>
      {children}
    </div>
  );
}