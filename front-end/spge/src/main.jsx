import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Pages
import Home from './pages/public/Home/index.jsx'
import LoginAluno from './pages/public/LoginAluno/index.jsx'

//Contexts
import { SessaoProvider } from './contexts/SessaoContext.jsx'
import MenuAluno from './pages/private/MenuAluno/index.jsx'


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
        path: "//loginAluno",
        element: <LoginAluno/>
      },
      {
        path: "/menuAluno",
        element: <MenuAluno/>
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <SessaoProvider>
    <RouterProvider
      router={router}
    />
  </SessaoProvider>
)
