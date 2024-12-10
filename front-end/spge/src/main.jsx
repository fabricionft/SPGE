import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//PAGES

//Pública
import Home from './pages/public/Home/index.jsx';
import LoginAluno from './pages/public/LoginAluno/index.jsx';
import LoginProfessor from './pages/public/LoginProfessor/index.jsx';
import LoginFuncionario from './pages/public/LoginFuncionario/index.jsx';

//Aluno
import MenuAluno from './pages/aluno/MenuAluno/index.jsx';
import NotasAluno from './pages/aluno/NotasAluno/index.jsx';
import DadosAluno from './pages/aluno/DadosAluno/index.jsx';

//Professor
import MenuProfessor from './pages/professor/MenuProfessor/index.jsx';
import SalaDoProfessor from './pages/professor/SalaDoProfessor/index.jsx';
import FazerChamada from './pages/professor/FazerChamada/index.jsx';
import DefinirNota from './pages/professor/DefinirNota/index.jsx';

//Funcionário

//Contexts
import { SessaoProvider } from './contexts/SessaoContext.jsx';
import { MessageBoxProvider } from './contexts/MessageBoxContext.jsx';
import { LoaderProvider } from './contexts/LoaderContext.jsx';
import MenuFuncionario from './pages/funcionario/MenuFuncionario/index.jsx';
import Salas from './pages/funcionario/Salas/index.jsx';
import CriarSala from './pages/funcionario/CriarSala/index.jsx';
import Alunos from './pages/funcionario/Alunos/index.jsx';
import AdicionarAluno from './pages/funcionario/AdicionarAluno/index.jsx';
import EditarAluno from './pages/funcionario/EditarAluno/index.jsx';
import Aluno from './pages/funcionario/Aluno/index.jsx';
import Materias from './pages/funcionario/Materias/index.jsx';
import CriarMateria from './pages/funcionario/CriarMateria/index.jsx';
import Professores from './pages/funcionario/Professores/index.jsx';
import AdicionarProfessor from './pages/funcionario/AdicionarProfessor/index.jsx';
import EditarProfessor from './pages/funcionario/EditarProfessor/index.jsx';
import Sala from './pages/funcionario/Sala/index.jsx';
import AdicionarAlunoEmUmaSala from './pages/funcionario/AdicionarAlunoEmUmaSala/index.jsx';
import AdicionarProfessorEmUmaSala from './pages/funcionario/AdicionarProfessorEmUmaSala/index.jsx';
import { RenderizacaoProvider } from './contexts/RenderizacaoContext.jsx';
import RecadosAluno from './pages/aluno/RecadosAluno/index.jsx';
import EnviarRecadoParaSala from './pages/professor/EnviarRecadoParaSala/index.jsx';
import EnviarRecadoParaAluno from './pages/professor/EnviarRecadoParaAluno/index.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/loginAluno",
        element: <LoginAluno/>
      },
      {
        path: "/loginProfessor",
        element: <LoginProfessor/>
      },
      {
        path: "/loginFuncionario",
        element: <LoginFuncionario/>
      },
      {
        path: "/menuAluno",
        element: <MenuAluno/>
      },
      {
        path: "/dadosAluno",
        element: <DadosAluno/>
      },
      {
        path: "/notasAluno",
        element: <NotasAluno/>
      },
      {
        path: "/recadosAluno",
        element: <RecadosAluno/>
      },
      {
        path: "/menuProfessor",
        element: <MenuProfessor/> 
      },
      {
        path: "/salaDoProfessor/:codigoSalaParam",
        element: <SalaDoProfessor/>
      },
      {
        path: "/fazerChamada/:codigoSalaParaOrdemAlfabeticaParam",
        element: <FazerChamada/>
      },
      {
        path: "/enviarRecadoParaSala/:codigoSalaParam",
        element: <EnviarRecadoParaSala/>
      },
      {
        path: "/enviarRecadoParaAluno/:codigoAlunoParam",
        element: <EnviarRecadoParaAluno/>
      },
      {
        path: "/definirNota/:codigoAlunoParam",
        element: <DefinirNota/>
      },
      {
        path: "/menuFuncionario",
        element: <MenuFuncionario/>
      },
      {
        path: "/materias",
        element: <Materias/>
      },
      {
        path: "/criarMateria",
        element: <CriarMateria/>
      },
      {
        path: "/salas",
        element: <Salas/>
      },
      {
        path: "/criarSala",
        element: <CriarSala/>
      },
      {
        path: "/sala/:codigoSalaParam",
        element: <Sala/>
      },
      {
        path: "/AdicionarAlunoEmUmaSala/:codigoSalaParaAdicionarAlunoParam",
        element: <AdicionarAlunoEmUmaSala/>
      },
      {
        path: "/adicionarProfessorEmUmaSala/:codigoSalaParaAdicionarProfessorParam",
        element: <AdicionarProfessorEmUmaSala/>
      },
      {
        path: "/professores",
        element: <Professores/>
      },
      {
        path: "/adicionarProfessor",
        element: <AdicionarProfessor/>
      },
      {
        path: "/editarProfessor/:codigoProfessorParam",
        element: <EditarProfessor/>
      },
      {
        path: "/alunos",
        element: <Alunos/>
      },
      {
        path: "/adicionarAluno",
        element: <AdicionarAluno/>
      },
      {
        path: "/editarAluno/:codigoAlunoParam",
        element: <EditarAluno/>
      },
      {
        path: "/aluno/:codigoAlunoParam",
        element: <Aluno/>
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <SessaoProvider>
    <MessageBoxProvider>
      <LoaderProvider>
        <RenderizacaoProvider>
          <RouterProvider router={router}/>
        </RenderizacaoProvider>
      </LoaderProvider>
    </MessageBoxProvider>
  </SessaoProvider>
)
