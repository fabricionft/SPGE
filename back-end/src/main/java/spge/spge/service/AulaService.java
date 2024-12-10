package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.exception.RequestException;
import spge.spge.model.AulaModel;
import spge.spge.model.ProfessorModel;
import spge.spge.repository.AulaRepository;
import spge.spge.repository.ProfessorRepository;

import java.util.List;

@Service
public class AulaService {

    @Autowired
    private AulaRepository aulaRepository;

    @Autowired
    private ProfessorRepository professorRepository;


    public List<AulaModel> buscarAulasDeUmProfessor(Long codigoProfessor){
        ProfessorModel professor = buscarProfessorPorCodigo(codigoProfessor);
        return aulaRepository.buscarAulasDeUmProfessor(professor.getCodigo());
    }


    //Privados
    private ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Professor inexistente!"));
    }
}
