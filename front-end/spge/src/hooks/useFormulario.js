import { useState } from "react"

const useFormulario = () => {

  const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

  return{visibilidadeSenha, setVisibilidadeSenha};
}

export default useFormulario;