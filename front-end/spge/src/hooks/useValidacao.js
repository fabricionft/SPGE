import useMessageBox from '../hooks/useMessageBox';

const useValidacao = () => {

  const {exibirMessageBox} = useMessageBox();

  const validarCadastroAlunoEtapa1 = (aluno) => {
    if(aluno.nome && aluno.rg && aluno.cpf && aluno.nomeDaMae && aluno.nomeDoPai
      && aluno.mes !== "escolha" && aluno.dia !== "escolha" && aluno.ano !== "escolha"
      && aluno.matricula && aluno.ra
    ){
      let erros = [];

      if(!aluno.nome.split(" ")[1]) erros.push("Digite o nome completo!");
      if(![8, 9].includes(aluno.rg.length)) erros.push("Digite o RG completo!");

      if(aluno.cpf.length !== 11) erros.push("Digite o CPF completo!");
      else if(!validarCPF(aluno.cpf)) erros.push("Digite um CPF válido!");

      if(!aluno.nomeDaMae.split(" ")[1]) erros.push("Digite o nome da mãe completo!");
      if(!aluno.nomeDoPai.split(" ")[1]) erros.push("Digite o nome do pai completo!");
      if(aluno.matricula.length !== 14) erros.push("Digite o número da matrícula completo!");
      if(aluno.ra.length !== 11) erros.push("Digite o número do RA completo!");

      if(erros.length == 0){
        return true;
      }
      else{
        exibirMessageBox(
          '',
          erros,
          1
        );
        return false;
      }
    }
    else{
      exibirMessageBox(
        '',
        "Preencha todos os campos",
        1
      );
      return false;
    }
  }

  const validarCadastroAlunoEtapa2 = (aluno) => {
    if(aluno.cep && aluno.estado && aluno.cidade && aluno.bairro && aluno.rua && aluno.numero){
     return true;
    }
    else{
      exibirMessageBox(
        '',
        "Preencha todos os campos",
        1
      );
      return false;
    }
  }

  function validarCPF(cpf){
    const digitoJ = gerarDigitoVerificador(cpf, 10);
    const digitoK = gerarDigitoVerificador(cpf, 11);

    if(digitoJ == cpf.substring(9, 10) && digitoK == cpf.substring(10,11)) return true;
    else return false;
  }

  function gerarDigitoVerificador(cpf, maximo){
    let somaDigitos = 0;
    let inicio = 0;
    let fim = 1;
    for(var i = maximo; i >= 2; i--){
        somaDigitos += cpf.substring(inicio, fim) * i;
        inicio++;
        fim++;
    }
    if((11 - (somaDigitos % 11)) >= 10) return 0;
    else return (11 - (somaDigitos % 11));
  }

  return{
    validarCadastroAlunoEtapa1, validarCadastroAlunoEtapa2
  };
}

export default useValidacao;