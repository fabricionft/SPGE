package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.LoginFuncionarioRequestDTO;
import spge.spge.dto.response.LoginFuncionarioResponseDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.FuncionarioModel;
import spge.spge.repository.FuncionarioRepository;

import java.util.List;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder encoder;

    public List<FuncionarioModel> listarFuncionarios(){
        return  funcionarioRepository.findAll();
    }

    public FuncionarioModel buscarFuncionarioPorCodigo(Long codigo){
        return funcionarioRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Funcionário inexistente"));
    }

    public FuncionarioModel salvarFuncionario(FuncionarioModel funcionario){
        if(funcionarioRepository.findByEmail(funcionario.getEmail()).isPresent()){
            throw new RequestException("Este email já esta sendo utilizado, por favor, defina outro!");
        }

        funcionario.setSenha(encoder.encode(funcionario.getSenha()));

        return funcionarioRepository.save(funcionario);
    }

    public LoginFuncionarioResponseDTO fazerLogin(LoginFuncionarioRequestDTO loginFuncionarioRequest){
        FuncionarioModel funcionario = buscarUSuarioPorEmail(loginFuncionarioRequest.getEmail());

        if(encoder.matches(loginFuncionarioRequest.getSenha(), funcionario.getSenha())){
            return  new LoginFuncionarioResponseDTO(
                    funcionario.getCodigo()
            );
        }else{
            throw new RequestException("Senha incorreta!");
        }
    }


    //Private
    private FuncionarioModel buscarUSuarioPorEmail(String email){
        return funcionarioRepository.findByEmail(email)
               .orElseThrow(() -> new RequestException("Funcionário inexistente!"));
    }
}
