import styles from './Loader.module.css';


import gifLogin from '../../../assets/gifs/loading.gif';


export default function Loader(){

  return(
    <div className={styles.containerLoader}>
      <img 
        src={gifLogin} 
        alt="Gif loading" 
      />
    </div>
  );
}