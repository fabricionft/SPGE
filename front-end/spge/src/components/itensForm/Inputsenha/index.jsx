import styles from './Inputsenha.module.css'

//Asasets
import iconOlho from '../../../assets/icons/olho.png';
import iconOlhoFechado from '../../../assets/icons/olhoF.png';
import useFormulario from '../../../hooks/useFormulario';



export default function InputSenha({dica, nome, preencherEntidade, entidade}){

  const {visibilidadeSenha, setVisibilidadeSenha} = useFormulario();

  return(
    <div className={styles.linhaInputSenha}>
      <input 
        placeholder={dica}
        type={(visibilidadeSenha) ? "text" : "password"} 
        name={nome}
        onChange={(e) => preencherEntidade(e)}
        value={entidade || ""}
      />

      <img 
        src={(visibilidadeSenha) ? iconOlho : iconOlhoFechado} 
        alt="Icon olho" 
        onClick={() => setVisibilidadeSenha((visibilidadeSenha) ? false : true)}
      />
    </div>
  )
}