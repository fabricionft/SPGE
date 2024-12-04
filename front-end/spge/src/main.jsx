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
import { LoaderProvider } from './contexts/LoaderProvider.jsx';
import MenuFuncionario from './pages/funcionario/MenuFuncionario/index.jsx';
import Salas from './pages/funcionario/Salas/index.jsx';
import CriarSala from './pages/funcionario/CriarSala/index.jsx';
import Alunos from './pages/funcionario/Alunos/index.jsx';
import AdicionarAluno from './pages/funcionario/AdicionarAluno/index.jsx';
import EditarAluno from './pages/funcionario/EditarAluno/index.jsx';
import Aluno from './pages/funcionario/Aluno/index.jsx';


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
        path: "/menuProfessor",
        element: <MenuProfessor/> 
      },
      {
        path: "/salaDoProfessor/:codigoSala",
        element: <SalaDoProfessor/>
      },
      {
        path: "/fazerChamada/:codigoSalaParaOrdemAlfabeticaParam",
        element: <FazerChamada/>
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
        path: "/salas",
        element: <Salas/>
      },
      {
        path: "/criarSala",
        element: <CriarSala/>
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
        <RouterProvider router={router}/>
      </LoaderProvider>
    </MessageBoxProvider>
  </SessaoProvider>
)
