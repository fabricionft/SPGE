import { Outlet } from 'react-router-dom';
import useRotas from './hooks/useRotas';
import PrivatePage from './pages/custom/PrivatePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MenuBar from './components/layout/MenuBar';

function App() {

  const {verificarSeERotaPublica, verificarSeERotaPrivada} = useRotas();

  return (
    <>
      <Header/>
      <MenuBar/>
      {
        verificarSeERotaPublica() ? (
          <Outlet/>
        ) : verificarSeERotaPrivada() && (
          <PrivatePage>
            <Outlet/>
          </PrivatePage>
        )
      }
      <Footer/>
    </>
  )
}

export default App
