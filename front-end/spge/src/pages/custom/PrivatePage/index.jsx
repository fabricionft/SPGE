import useRotas from "../../../hooks/useRotas"

export default function PrivatePage({children}){

  const {bloquearRotaPrivada} = useRotas();

  bloquearRotaPrivada();

  console.log("AAa")

  return(
    <>
      {children}
    </>
  )
}