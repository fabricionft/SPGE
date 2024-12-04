import styles from './MenuAluno.module.css';

//Assets
import iconNotas from '../../../assets/icons/notas.png';
import iconUsuario from '../../../assets/icons/usuario.png';

//Components
import Container from "../../../components/layout/Container/inde";
import Card from "../../../components/utils/Card";
import ContainerDeCards from "../../../components/utils/ContainerDeCards";



export default function MenuAluno(){

  return(
    <Container>
      <ContainerDeCards>
        <Card
          destino={"/dadosAluno"}
        >
          <img 
            src={iconUsuario} 
            alt="IconNotas" 
            className={styles.imgOpcao}  
          />
          <h1 className={styles.tituloOpcao}>Meus dados</h1>
          <p className={styles.textoOpcao}>Aqui você pode acessar todos seus dados escolares.</p>
        </Card>

        <Card
          destino={"/notasAluno"}
        >
          <img 
            src={iconNotas} 
            alt="IconNotas" 
            className={styles.imgOpcao}  
          />
          <h1 className={styles.tituloOpcao}>Notas</h1>
          <p className={styles.textoOpcao}>Aqui você pode acessar todas as suas notas, presenças e faltas.</p>
        </Card>

        <Card
          destino={"/notasAluno"}
        >
          <img 
            src={iconNotas} 
            alt="IconNotas" 
            className={styles.imgOpcao}  
          />
          <h1 className={styles.tituloOpcao}>Recados</h1>
          <p className={styles.textoOpcao}>Aqui você pode acessar todos seus recados.</p>
        </Card>
      </ContainerDeCards>
    </Container>
  )
}