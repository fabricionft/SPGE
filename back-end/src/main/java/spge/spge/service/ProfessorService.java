package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.FazerChamadaRequestDTO;
import spge.spge.dto.request.DefinirNotaRequestDTO;
import spge.spge.dto.request.LoginProfessorRequestDTO;
import spge.spge.dto.response.LoginProfessorResponseDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.*;
import spge.spge.repository.AlunoRepository;
import spge.spge.repository.ProfessorRepository;
import spge.spge.repository.SalaRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    @Value("${senha.inicial.professor}")
    private String senhaInicial;


    public List<ProfessorModel> listarProfessores(){
        return professorRepository.findAll();
    }

    public List<ProfessorModel> listarProfessoresDeumaSala(Long codigoSala){
        return professorRepository.listarProfessoresDeUmaSala(codigoSala);
    }

    public  List<ProfessorModel> listarProfessoresQueNaoFazemParteDeDeterminadaSala(Long codigoSala){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        List<ProfessorModel> professoresQueNaoFazemParteDaSala = new ArrayList<>();

        for(ProfessorModel professor: professorRepository.findAll()){
            if(professorRepository.buscarProfessorEmDeterminadaSala(sala.getCodigo()).isEmpty()){
                professoresQueNaoFazemParteDaSala.add(professor);
            }
        }

        return professoresQueNaoFazemParteDaSala;
    }

    public ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }

    public List<SalaModel> buscarSalasDeUmProfessor(Long codigo){
        return professorRepository.buscarSalasQueOProfessorFazParte(codigo);
    }

    public SalaModel buscarSalaPorCodigo(Long codigo){
        return salaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Sala inexistente!"));
    }

    public ProfessorModel salvarProfessor(ProfessorModel professor, Boolean primeiroSave){
        if(primeiroSave){
            System.out.println(primeiroSave);
            if(professorRepository.findByEmail(professor.getEmail()).isPresent()){
                throw new RequestException("Desculpe, este email já esta sendo utilizado!");
            }

            if(professorRepository.buscarProfessorPorCpfEMateria(professor.getCpf(), professor.getMateria()).isPresent()){
                throw new RequestException("Desculpe, este professor já foi cadastrado para esta matéria!");
            }

            professor.setSenha(encoder.encode(senhaInicial));
        }

        return professorRepository.save(professor);
    }

    public LoginProfessorResponseDTO fazerLogin(LoginProfessorRequestDTO loginProfessorRequest){
        ProfessorModel professor = buscarProfessorPorEmail(loginProfessorRequest.getEmail());

        if(encoder.matches(loginProfessorRequest.getSenha(), professor.getSenha())){
            return  new LoginProfessorResponseDTO(
                professor.getCodigo(),
                professor.getNome(),
                professor.getMateria()
            );
        }else{
            throw new RequestException("Senha incorreta");
        }
    }

    public SalaModel fazerChamada(FazerChamadaRequestDTO fazerChamadaRequest){
        SalaModel sala = buscarSalaPorCodigo(fazerChamadaRequest.getCodigoSala());
        ProfessorModel professor = buscarProfessorPorCodigo(fazerChamadaRequest.getCodigoProfessor());
        List<AlunoModel> alunos = aLunoRepository.listarAlunosDeUmaSalaEmOrdemAlfabetica(sala.getCodigo());

        if(!sala.getProfessores().contains(professor)){
            throw new RequestException("Desculpe, este professor não faz parte desta sala!");
        }

        if(!fazerChamadaRequest.getNumeroDoBimestre().equals(1) && !fazerChamadaRequest.getNumeroDoBimestre().equals(2) &&
           !fazerChamadaRequest.getNumeroDoBimestre().equals(3) && !fazerChamadaRequest.getNumeroDoBimestre().equals(4)){
            throw new RequestException("Digite um bimestre válido!");
        }

        if(fazerChamadaRequest.getQuantidadeDeAulas() < 1){
            throw new RequestException("A quantidade de aulas deve ser maior que 0!");
        }

        if(sala.getAlunos().size() != fazerChamadaRequest.getPresencas().size()){
            throw new RequestException("A lista de presença precisa ter exatamente o mesmo tamanho da lista de alunos!");
        }

        List<PresencaModel> listaDePresenca = new ArrayList<>();
        int indice = 0;
        for(AlunoModel aluno: alunos){
            if(aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno(aluno.getCodigo(), fazerChamadaRequest.getNumeroDoBimestre(), professor.getMateria()).isPresent()){
                DesempenhoModel desempenho = aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno
                (
                    aluno.getCodigo(),
                    fazerChamadaRequest.getNumeroDoBimestre(),
                    professor.getMateria()
                ).get();

                if(fazerChamadaRequest.getPresencas().get(indice).equals("P")){ // P = pressente, A = ausente
                    desempenho.setTotalDePresencas(desempenho.getTotalDePresencas() + fazerChamadaRequest.getQuantidadeDeAulas());
                }

                desempenho.setTotalDeAulas(desempenho.getTotalDeAulas() + fazerChamadaRequest.getQuantidadeDeAulas());
            }

            listaDePresenca.add(new PresencaModel(
                null,
                aluno.getNome(),
                fazerChamadaRequest.getPresencas().get(indice)
            ));

            indice++;
        }

        SimpleDateFormat sp = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        professor.getAulas().add(new AulaModel(
            null,
            professor.getMateria(),
            sp.format(new Date()),
            fazerChamadaRequest.getQuantidadeDeAulas(),
            listaDePresenca
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

    public String excluirProfessorPorCodigo(Long codigo){
        ProfessorModel professor = buscarProfessorPorCodigo(codigo);

        professorRepository.delete(professor);
        return "Professor excluído com sucesso!";
    }


    //Private
    private ProfessorModel buscarProfessorPorEmail(String email){
        return professorRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }

    private AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Aluno inexistente!"));
    }
}
