package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.exception.RequestException;
import spge.spge.model.MateriaModel;
import spge.spge.repository.MateriaRepository;

import java.util.List;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    public List<MateriaModel> listarMaterias(){
        return materiaRepository.findAll();
    }

    public MateriaModel salvarMateria(MateriaModel materia){
        materia.setMateria(materia.getMateria().toLowerCase());

        if(materiaRepository.findByMateria(materia.getMateria()).isPresent()){
            throw new RequestException("Desculpe, esta matéria já existe!");
        }

        return materiaRepository.save(materia);
    }
}
