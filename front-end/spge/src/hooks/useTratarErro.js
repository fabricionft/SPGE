const useTratarErro = () => {

  const tratarErro = (erro) => {

    console.log(erro.response.data.message)
  }

  return{tratarErro};
}

export default useTratarErro;