const formatarCPF = (cpf) => {

  return "***.***.".concat(cpf.substring(6, 9).concat("-").concat(cpf.substring(9, 11)));
} 

export default formatarCPF;