import styles from './MenuBar.module.css';


export default function MenuBar(){


  return(
    <div >
      <input type="checkbox" className={styles.aciona} id="menuBar" />

      <div className={styles.esconderMenuBar}></div>

      <div className={styles.menuBar}>
        <label htmlFor="menuBar">X</label>
      </div>
    </div>
  )
}