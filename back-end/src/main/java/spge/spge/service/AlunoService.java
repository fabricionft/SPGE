package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.LoginAlunoRequestDTO;
import spge.spge.dto.response.LoginAlunoResponseDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.AlunoModel;
import spge.spge.model.BimestreModel;
import spge.spge.model.DesempenhoModel;
import spge.spge.repository.AlunoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository aLunoRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Value("${senha.inicial}")
    private String senhaInicial;


    public List<AlunoModel> listarAlunos(){
        return aLunoRepository.findAll();
    }

    public AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Aluno inexistente!"));
    }

    public AlunoModel salvarAluno(AlunoModel aluno){
        if(aLunoRepository.findByEmail(aluno.getEmail()).isPresent()){
            throw new RequestException("Desculpe, este email já esta sendo utilizado!");
        }

        if(aLunoRepository.findByCpf(aluno.getCpf()).isPresent()){
            throw new RequestException("Desculpe, este aluno já foi cadastrado!");
        }

        for(int i = 0; i <=3; i++){
            aluno.getHistoricoDeDesempenho().add(new BimestreModel(
                null,
                i+1,
                new ArrayList<DesempenhoModel>()
            ));
        }

        aluno.setSenha(encoder.encode(senhaInicial));

        return aLunoRepository.save(aluno);
    }

    public LoginAlunoResponseDTO fazerLogin(LoginAlunoRequestDTO loginAlunoRequest){
        AlunoModel aluno = buscarAlunoPorEmail(loginAlunoRequest.getEmail());

        if(encoder.matches(loginAlunoRequest.getSenha(), aluno.getSenha())){
            return new LoginAlunoResponseDTO(
                aluno.getCodigo()
            );
        }else{
            throw new RequestException("Senha incorreta!");
        }
    }

    public String excluirALuno(Long codigo){
        AlunoModel aluno = buscarAlunoPorCodigo(codigo);

        aLunoRepository.delete(aluno);
        return "Aluno excluído com sucesso!";
    }


    //Privados
    private AlunoModel buscarAlunoPorEmail(String email){
        return aLunoRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Aluno inexistente!"));
    }
}
