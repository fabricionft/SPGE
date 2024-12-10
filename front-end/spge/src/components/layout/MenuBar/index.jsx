import styles from './MenuBar.module.css';

//Assets
import iconCasa from '../../../assets/icons/iconCasa.png';
import iconEngrenagem from '../../../assets/icons/iconEngrenagem.png';
import iconUsuario from '../../../assets/icons/usuario.png';
import iconNotas from '../../../assets/icons/notas.png';
import iconSala from '../../../assets/icons/iconSala.png';

import useSessao from '../../../hooks/useSessao';
import { Link, useLocation } from 'react-router-dom';
import rotasDeAluno from '..///../../constants/rotasDeAluno';
import rotasDeProfessor from '..///../../constants/rotasDeProfessor';
import rotasDeFuncionario from '..///../../constants/rotasDeFuncionario';


export default function MenuBar(){

  const {sessaoAluno, sessaoProfessor, sessaoFuncionario, deslogarAluno, deslogarProfessor, deslogarFuncionario} = useSessao();
  const location = useLocation();
  const fecharMenuBar = () => document.getElementById('menuBar').checked = false;

  return(
    <div >
      <input type="checkbox" className={styles.aciona} id="menuBar" />

      <div className={styles.esconderMenuBar} onClick={fecharMenuBar}></div>

      <div className={styles.menuBar}>
        <div className={styles.margemMenuBar}>
          <header className={styles.cabecalhoMenuBar}>
            {
              sessaoAluno ? (
                <p onClick={deslogarAluno}>
                  Sair
                </p>
              ) : sessaoProfessor ? (
                <p onClick={deslogarProfessor}>
                  Sair
                </p>
              ) : sessaoFuncionario ? (
                <p onClick={deslogarFuncionario}>
                  Sair
                </p>
              ) : (
                <Link
                  to={"/loginAluno"}
                  className={styles.link}
                  onClick={fecharMenuBar}
                >
                  Login
                </Link>
              )
            }
          </header>

          <div className={styles.opcoes}>
            <Link
              className={styles.opcao}
              onClick={fecharMenuBar}
            >
              <div className={styles.alinhaImagem}>
                <img 
                  src={iconCasa} 
                  alt="Icon casa"   
                />
              </div>

              <p>Home</p>
            </Link>

            {
              (sessaoAluno && rotasDeAluno.includes(location.pathname)) && (
                <>
                  <Link
                    to={"/menuAluno"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <div className={styles.alinhaImagem}>
                      <img 
                        src={iconEngrenagem} 
                        alt="Icon casa"   
                      />
                    </div>

                    <p>Menu aluno</p>
                  </Link>

                  <Link
                    to={"/dadosAluno"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <div className={styles.alinhaImagem}>
                      <img 
                        src={iconUsuario} 
                        alt="Icon casa"   
                      />
                    </div>

                    <p>Meus dados</p>
                  </Link>

                  <Link
                    to={"/notasAluno"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <div className={styles.alinhaImagem}>
                      <img 
                        src={iconNotas} 
                        alt="Icon casa"   
                      />
                    </div>

                    <p>Notas</p>
                  </Link>
                </>
              )
            }

            {
              (sessaoProfessor && rotasDeProfessor.includes(location.pathname)) && (
                <>
                  <Link
                    to={"/menuProfessor"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <div className={styles.alinhaImagem}>
                      <img 
                        src={iconSala} 
                        alt="Icon casa"   
                      />
                    </div>

                    <p>Minhas salas</p>
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}