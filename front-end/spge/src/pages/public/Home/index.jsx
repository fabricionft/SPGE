import BotaoLink from '../../../components/utils/BotaoLink';
import Container from '../../../components/layout/Container/inde';
import useSessao from '../../../hooks/useSessao';

export default function Home(){

  const {sessaoAluno, sessaoProfessor, sessaoFuncionario} = useSessao();

  return(
    <Container
      centralizar={true}
    >
      <BotaoLink
        destino={(sessaoAluno) ? "/menuAluno" : "/loginAluno"}
        msg={"Sou aluno"}
      />
      <br />
      <BotaoLink
        destino={(sessaoProfessor) ? "/menuProfessor" : "/loginProfessor"}
        msg={"Sou professor"}
      />
      <br />
      <BotaoLink
        destino={(sessaoFuncionario) ? "/menuFuncionario" : "/loginFuncionario"}
        msg={"Sou funcionário"}
      />
    </Container>
  )
}