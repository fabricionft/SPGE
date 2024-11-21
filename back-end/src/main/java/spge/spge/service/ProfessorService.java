package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.DefinirNotaRequestDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.AlunoModel;
import spge.spge.model.NotaModel;
import spge.spge.model.ProfessorModel;
import spge.spge.model.SalaModel;
import spge.spge.repository.ALunoRepository;
import spge.spge.repository.ProfessorRepository;

import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ALunoRepository aLunoRepository;



    public List<ProfessorModel> listarProfessores(){
        return professorRepository.findAll();
    }

    public List<SalaModel> buscarSalasDeUmProfessor(Long codigo){
        return professorRepository.buscarSalasQueOProfessorFazParte(codigo);
    }

    public ProfessorModel salvarProfessor(ProfessorModel professor){
        return professorRepository.save(professor);
    }

    public AlunoModel definirNotaDeUmAluno(DefinirNotaRequestDTO definirNota){
        // ProfessorModel professor = buscarProfessorPorCodigo(codigoProfessor);
        AlunoModel aluno = buscarAlunoPorCodigo(definirNota.getCodigoAluno());

        NotaModel nota = aLunoRepository.buscarNotaEspecificaEmBimestreEspecificoDeUmAluno(aluno.getCodigo(), definirNota.getNumeroDoBimestre(), definirNota.getMateria())
                         .orElseThrow(() -> new RequestException("impossível buscar essa nota!"));

        nota.setNota(definirNota.getNota());

        return aLunoRepository.save(aluno);
    }


    //Private
    public ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }

    public AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Aluno inexistente!"));
    }
}
