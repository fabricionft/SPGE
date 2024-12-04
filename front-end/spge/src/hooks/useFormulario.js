import { useState } from "react"

const useFormulario = () => {

  const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

  const [etapa, setEtapa] = useState(0);

  const avancarEtapa = () => setEtapa(etapa+1);
  const voltarEtapa = () => setEtapa(etapa-1);

  const estados =  ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',];
  const meses = [1, 2, 3, 4, 5, 6, ,7 ,8 , 9, 10, 11, 12]
  const dias = [1, 2, 3, 4, 5, 6, ,7 ,8 , 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const anos = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

  return{
    visibilidadeSenha, setVisibilidadeSenha,
    etapa, avancarEtapa, voltarEtapa,
    estados, meses, dias, anos
  };
}

export default useFormulario;