import BotaoLink from '../../../components/utils/BotaoLink';
import Container from '../../../components/layout/Container/inde';
import styles from './Home.module.css';

export default function Home(){

  return(
    <Container>
      <BotaoLink
        destino={"/loginAluno"}
        msg={"Teste"}
      />

      <BotaoLink
        destino={"/"}
        msg={"Teste"}
      />

      <BotaoLink
        destino={"/"}
        msg={"Teste"}
      />
    </Container>
  )
}