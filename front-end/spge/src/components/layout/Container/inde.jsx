import styles from './Container.module.css';


export default function Container({children}){


  return(
    <div className={styles.container}>
      <div className={styles.margemContainer}>
        {children}
      </div>
    </div>
  )
}