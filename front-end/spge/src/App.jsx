import { Outlet } from 'react-router-dom';
import useRotas from './hooks/useRotas';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MenuBar from './components/layout/MenuBar';
import MessageBox from './components/utils/MessageBox';
import CardLoader from './components/utils/CardLoader';
import AlunoPage from './pages/custom/AlunoPage';
import ProfessorPage from './pages/custom/ProfessorPage';
import FuncionarioPage from './pages/custom/FuncionarioPage';

function App() {

  const {verificarSeERotaPublica, verificarSeEDeAluno, verificarSeEDeProfessor, verificarSeEDeFuncionario} = useRotas();

  return (
    <>
      <Header/>
      <MenuBar/>
      {
        verificarSeERotaPublica() ? (
          <Outlet/>
        ) : verificarSeEDeAluno() ? (
          <AlunoPage>
            <Outlet/>
          </AlunoPage>
        ) : verificarSeEDeProfessor() ? (
          <ProfessorPage>
            <Outlet/>
          </ProfessorPage>
        ) : verificarSeEDeFuncionario() && (
          <FuncionarioPage>
            <Outlet/>
          </FuncionarioPage>
        )
      }
      <Footer/>

      <CardLoader/>
      <MessageBox/>
    </>
  )
}

export default App
