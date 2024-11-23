package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.model.AlunoModel;
import spge.spge.model.BimestreModel;
import spge.spge.model.NotaModel;
import spge.spge.repository.AlunoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository aLunoRepository;


    public List<AlunoModel> listarAlunos(){
        return aLunoRepository.findAll();
    }

    public AlunoModel salvarAluno(AlunoModel aluno){
        for(int i = 0; i <=3; i++){
            aluno.getHistoricoDeNotas().add(new BimestreModel(
                null,
                i+1,
                new ArrayList<NotaModel>()
            ));
        }

        return aLunoRepository.save(aluno);
    }

}
