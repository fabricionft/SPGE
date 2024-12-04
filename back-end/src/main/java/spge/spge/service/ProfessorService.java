package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.CriarAulaRequestDTO;
import spge.spge.dto.request.DefinirNotaRequestDTO;
import spge.spge.dto.request.LoginProfessorRequestDTO;
import spge.spge.dto.response.LoginProfessorResponseDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.*;
import spge.spge.repository.AlunoRepository;
import spge.spge.repository.ProfessorRepository;
import spge.spge.repository.SalaRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private AlunoRepository aLunoRepository;

    @Autowired
    private PasswordEncoder encoder;


    public List<ProfessorModel> listarProfessores(){
        return professorRepository.findAll();
    }

    public List<SalaModel> buscarSalasDeUmProfessor(Long codigo){
        return professorRepository.buscarSalasQueOProfessorFazParte(codigo);
    }

    public SalaModel buscarSalaPorCodigo(Long codigo){
        return salaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Sala inexistente!"));
    }

    public ProfessorModel salvarProfessor(ProfessorModel professor){
        professor.setSenha(encoder.encode(professor.getSenha()));
        return professorRepository.save(professor);
    }

    public LoginProfessorResponseDTO fazerLogin(LoginProfessorRequestDTO loginProfessorRequest){
        ProfessorModel professor = buscarProfessorPorEmail(loginProfessorRequest.getEmail());

        if(encoder.matches(loginProfessorRequest.getSenha(), professor.getSenha())){
            return  new LoginProfessorResponseDTO(
                professor.getCodigo(),
                professor.getMateria()
            );
        }else{
            throw new RequestException("Senha incorreta");
        }
    }

    public SalaModel criarAula(CriarAulaRequestDTO criarAulaRequest){
        SalaModel sala = buscarSalaPorCodigo(criarAulaRequest.getCodigoSala());
        ProfessorModel professor = buscarProfessorPorCodigo(criarAulaRequest.getCodigoProfessor());
        List<AlunoModel> alunos = aLunoRepository.listarAlunosDeUmaSalaEmOrdemAlfabetica(sala.getCodigo());

        if(!sala.getProfessores().contains(professor)){
            throw new RequestException("Desculpe, este professor não faz parte desta sala!");
        }

        if(!criarAulaRequest.getNumeroDoBimestre().equals(1) && !criarAulaRequest.getNumeroDoBimestre().equals(2) &&
           !criarAulaRequest.getNumeroDoBimestre().equals(3) && !criarAulaRequest.getNumeroDoBimestre().equals(4)){
            throw new RequestException("Digite um bimestre válido!");
        }

        if(criarAulaRequest.getQuantidadeDeAulas() < 1){
            throw new RequestException("A quantidade de aulas deve ser maior que 0!");
        }

        if(sala.getAlunos().size() != criarAulaRequest.getPresencas().size()){
            throw new RequestException("A lista de presença precisa ter exatamente o mesmo tamanho da lista de alunos!");
        }

        int indice = 0;
        for(AlunoModel aluno: alunos){
            if(aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno(aluno.getCodigo(), criarAulaRequest.getNumeroDoBimestre(), professor.getMateria()).isPresent()){
                DesempenhoModel desempenho = aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno
                (
                    aluno.getCodigo(),
                    criarAulaRequest.getNumeroDoBimestre(),
                    professor.getMateria()
                ).get();

                if(criarAulaRequest.getPresencas().get(indice).equals("P")){ // P = pressente, A = ausente
                    desempenho.setTotalDePresencas(desempenho.getTotalDePresencas() + criarAulaRequest.getQuantidadeDeAulas());
                }

                desempenho.setTotalDeAulas(desempenho.getTotalDeAulas() + criarAulaRequest.getQuantidadeDeAulas());
            }
            indice++;
        }

        SimpleDateFormat sp = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        professor.getAulas().add(new AulaModel(
            null,
            sp.format(new Date()),
            criarAulaRequest.getQuantidadeDeAulas()
        ));

        professorRepository.save(professor);
        return salaRepository.save(sala);
    }

    public AlunoModel definirNotaDeUmAluno(DefinirNotaRequestDTO definirNota){
        ProfessorModel professor = buscarProfessorPorCodigo(definirNota.getCodigoProfessor());
        AlunoModel aluno = buscarAlunoPorCodigo(definirNota.getCodigoAluno());

        if(professorRepository.buscarAlunoDeUmProfessor(definirNota.getCodigoAluno(), definirNota.getCodigoProfessor()).isEmpty()){
            throw new RequestException("Desculpe, você só pode editar a nota de alunos que você dá aula!");
        }

        if(!professor.getMateria().toLowerCase().equals(definirNota.getMateria().toLowerCase())){
            throw new RequestException("você só pode alterar as notas de matérias que você dá aula!");
        }

        if(definirNota.getNota() < 0 || definirNota.getNota() > 10){
            throw new RequestException("Defina uma nota válida, que fique entre 0-10.");
        }

        DesempenhoModel desempenho = aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno
        (
            aluno.getCodigo(),
            definirNota.getNumeroDoBimestre(),
            definirNota.getMateria()
        ).orElseThrow(() -> new RequestException("impossível buscar essa nota!"));

        desempenho.setNota(definirNota.getNota());

        return aLunoRepository.save(aluno);
    }


    //Private
    private ProfessorModel buscarProfessorPorEmail(String email){
        return professorRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }

    public ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }

    private AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Aluno inexistente!"));
    }
}
