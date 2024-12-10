import styles from './FormAluno.module.css';

import useFormulario from "../../../hooks/useFormulario"
import Input from '../../itensForm/Input';
import InputNumerico from '../../itensForm/InputNumerico';
import useAluno from '../../../hooks/useAluno';
import useValidacao from '../../../hooks/useValidacao';


export default function FormAluno(){

  const {etapa, avancarEtapa, voltarEtapa, estados, meses, dias, anos} = useFormulario();
  const {aluno, preencherAluno, buscarCep, enviarFormularioSalvarAluno} = useAluno();
  const {validarCadastroAlunoEtapa1, validarCadastroAlunoEtapa2} = useValidacao();

  return(
    <form>
      <header className={styles.cabecalhoFormulario}>
        <p>
          {
            etapa === 0 ? "Dados pessoais" :
            etapa === 1 ? "Dados de endereço" :
            etapa === 2 && "Dados de login" 
          }
        </p>

        <p>
          {etapa+1}/3
        </p>
      </header>

      <div>
        {
          etapa === 0 ? (
            <>
              <label>Nome completo</label>
              <Input
                dica={"Digite o nome do aluno"}
                nome={"nome"}
                preencherEntidade={preencherAluno}
                entidade={aluno.nome}
              />

              <label>RG (somente letras e números)</label>
              <Input
                 dica={"Digite o RG do aluno"}
                 nome={"rg"}
                 preencherEntidade={preencherAluno}
                 entidade={aluno.rg}
                 maximoDeCaracteres={9}
              />

              <label>CPF (somente números)</label>
              <InputNumerico
                 dica={"Digite o CPF do aluno"}
                 nome={"cpf"}
                 preencherEntidade={preencherAluno}
                 entidade={aluno.cpf}
                 maximoDeCaracteres={11}
                 rotaASerBloqueada={"/editarAluno"}
              />

              <label>Nome da mãe</label>
              <Input
                 dica={"Digite o nome da mãe do aluno"}
                 nome={"nomeDaMae"}
                 preencherEntidade={preencherAluno}
                 entidade={aluno.nomeDaMae}
              />

              <label>Nome do pai</label>
              <Input
                 dica={"Digite o nome do pai do aluno"}
                 nome={"nomeDoPai"}
                 preencherEntidade={preencherAluno}
                 entidade={aluno.nomeDoPai}
              />

              <label>Data de nascimento</label>
              <div className={styles.linhaDataDeNascimento}>
                <select 
                  name="mes"
                  onChange={(e) => preencherAluno(e)}
                  value={aluno.mes || "escolha"}
                >
                  <option value="escolha">Mês</option>
                  {
                    meses.map((mes) => (
                      <option
                        key={mes}
                        value={mes}
                      >
                        {mes}
                      </option>
                    ))
                  }
                </select>

                <select 
                  name="dia"
                  onChange={(e) => preencherAluno(e)}
                  value={aluno.dia}  
                >
                  <option value="escolha">Dia</option>
                  {
                    dias
                    .filter((dias) => 
                      [1, 3, 5, 7, 8, 10, 12].includes(parseInt(aluno.mes)) ? dias <= 31 :
                      [4, 6, 9, 11].includes(parseInt(aluno.mes)) ? dias <= 30 :
                      aluno.mes == 2 && dias <= 29
                    )
                    .map((dia) => (
                      <option 
                        key={dia}
                        value={dia}
                      >
                        {dia}  
                      </option>
                    ))
                  }
                </select>

                <select 
                  name="ano"
                  onChange={(e) => preencherAluno(e)}
                  value={aluno.ano}
                >
                  <option value="escolha">Ano</option>
                  {
                    anos.map((ano) => (
                      <option 
                        key={ano}
                        value={ano}
                      >
                        {ano}
                      </option>
                    ))
                  }
                </select>
              </div>

              <label>Número da matrícula (somente números)</label>
              <InputNumerico
                 dica={"Digite o número da matrícula do aluno"}
                 nome={"matricula"}
                 preencherEntidade={preencherAluno}
                 entidade={aluno.matricula}
                 maximoDeCaracteres={14}
                 rotaASerBloqueada={"/editarAluno"}
              />

              <label>Número do RA (somente números)</label>
              <InputNumerico
                dica={"Digite o número do RA do aluno"}
                nome={"ra"}
                preencherEntidade={preencherAluno}
                entidade={aluno.ra}
                maximoDeCaracteres={11}
                rotaASerBloqueada={"/editarAluno"}
              />
            </>
          ) : etapa === 1 ? (
            <>
              <label>CEP</label>
              <div className={styles.linhaCep}>
                <InputNumerico
                  dica={"Digite o CEP"}
                  nome={"cep"}
                  preencherEntidade={preencherAluno}
                  entidade={aluno.cep}
                  maximoDeCaracteres={8}
                />

                <button
                  type='button'
                  onClick={buscarCep}
                  className={[(aluno.cep.length !== 8) && "desativado"]}
                  disabled={(aluno.cep.length !== 8) ? true : false}
                >
                  Buscar CEP
                </button>
              </div>

              <label>Estado</label>
              <select 
                name="estado"
                onChange={(e) => preencherAluno(e)}
                value={aluno.estado || ""}
              >
                <option
                  value={"escolha"}
                >
                  Escolha
                </option>
                
                {
                  estados.map((estado) => (
                    <option
                      key={estado}
                      value={estado}
                    >
                      {estado}
                    </option>
                  ))
                }
              </select>

              <label>Cidade</label>
              <Input
                dica={"Digite o nome da cidade"}
                nome={"cidade"}
                preencherEntidade={preencherAluno}
                entidade={aluno.cidade}
              />

              <label>Bairro</label>
              <Input
                dica={"Digite o nome do bairro"}
                nome={"bairro"}
                preencherEntidade={preencherAluno}
                entidade={aluno.bairro}
              />

              <label>Rua</label>
              <Input
                dica={"Digite o nome da rua"}
                nome={"rua"}
                preencherEntidade={preencherAluno}
                entidade={aluno.rua}
              />

              <label>Número</label>
              <InputNumerico
                dica={"Digite o número da casa"}
                nome={"numero"}
                preencherEntidade={preencherAluno}
                entidade={aluno.numero}
                maximoDeCaracteres={5}
              />

              <label>Complemento (opcional)</label>
              <Input
                dica={"Digite o complemento"}
                nome={"complemento"}
                preencherEntidade={preencherAluno}
                entidade={aluno.complemento}
              />
            </>
          ) : etapa === 2 && (
            <>
              <label>Email (com sufixo "@gmail.com")</label>
              <Input
                dica={"digite o email"}
                nome={"email"}
                preencherEntidade={preencherAluno}
                entidade={aluno.email}
                rotaASerBloqueada={"/editarAluno"}
              />
            </>
          )
        }
      </div>

      <footer>
        {
          etapa === 0 ? (
            <button
              type='button'
              onClick={() => {
                  if(validarCadastroAlunoEtapa1(aluno)) avancarEtapa()
                }
              }
            >
              Avançar
            </button>
          ) : etapa === 1 ? (
            <>
              <button
                type='button'
                onClick={voltarEtapa}
              >
                Voltar
              </button>

              <button
                type='button'
                onClick={() => {
                    if(validarCadastroAlunoEtapa2(aluno)) avancarEtapa()
                  }
                }
              >
                Avançar
              </button>
            </>
          ) : etapa === 2 && (
            <>
              <button
                type='button'
                onClick={voltarEtapa}
              >
                Voltar
              </button>

              <button
                type='button'
                className={[(!aluno.email.endsWith("@gmail.com")) && "desativado"]}
                disabled={(!aluno.email.endsWith("@gmail.com"))}
                onClick={(e) => enviarFormularioSalvarAluno(e)}
              >
                Finzalizar
              </button>
            </>
          )
        }
      </footer>
    </form>
  )
}