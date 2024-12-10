export default function FormRecado({recado, preencherRecado, enviarFormulario}){

  return(
    <form
      onSubmit={enviarFormulario}
    >
      <textarea
        placeholder="Digite o recado"
        name="recado"
        onChange={(e) => preencherRecado(e)}
        value={recado.recado || ""}
      ></textarea>

      <button
        disabled={!recado.recado}
        className={[!recado.recado] && ""}
      >
        Enviar
      </button>
    </form>
  )
}