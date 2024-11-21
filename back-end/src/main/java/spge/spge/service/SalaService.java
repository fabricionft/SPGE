package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.SalaRequestDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.*;
import spge.spge.repository.ALunoRepository;
import spge.spge.repository.ProfessorRepository;
import spge.spge.repository.SalaRepository;

import java.util.List;

@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private ALunoRepository aLunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;


    public List<SalaModel> listarSalas(){
        return salaRepository.findAll();
    }

    public SalaModel criarSala(SalaRequestDTO salaRequest){
        SalaModel sala = new SalaModel();

        sala.setSerie(salaRequest.getSerie());
        sala.setTurma(salaRequest.getTurma());

        for(MateriaModel materia: salaRequest.getMaterias()){
            sala.getMaterias().add(materia.getMateria());
        }

        return salaRepository.save(sala);
    }

    public SalaModel adicionarAlunoEmUmaSala(Long codigoSala, Long codigoAluno){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        AlunoModel aluno = buscarAlunoPorCodigo(codigoAluno);

        if(sala.getAlunos().contains(aluno)){
            throw new RequestException("Desculpe, este aluno já faz parte desta sala!");
        }else {
            for (BimestreModel bimestre: aluno.getHistoricoDeNotas()){
                for(String materia: sala.getMaterias()){
                    bimestre.getBimestres().add(new NotaModel(
                        null,
                        materia,
                        0
                    ));
                };
            }

            sala.getAlunos().add(aluno);
        }

        sala.setQuantidadeDeAlunos(sala.getQuantidadeDeAlunos() + 1);

        return salaRepository.save(sala);
    }

    public SalaModel removerAlunoDeUmaSala(Long codigoSala, Long codigoAluno){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        AlunoModel aluno = buscarAlunoPorCodigo(codigoAluno);

        if(sala.getAlunos().contains(aluno)) {
            sala.getAlunos().remove(aluno);
        }else{
            throw  new RequestException("Este aluno não faz parte destya sala!");
        }

        sala.setQuantidadeDeAlunos(sala.getQuantidadeDeAlunos() - 1);

        return salaRepository.save(sala);
    }

    public SalaModel adicionarProfessorEmUmaSala(Long codigoSala, Long codigoProfessor){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        ProfessorModel professor = buscarProfessorPorCodigo(codigoProfessor);

        if(sala.getAlunos().contains(professor)){
            throw new RequestException("Desculpe, este professor já faz parte desta sala!");
        }else {
            sala.getProfessores().add(professor);
        }

        return salaRepository.save(sala);
    }

    public String excluirSalaPorCodigo(Long codigo){
        SalaModel sala = buscarSalaPorCodigo(codigo);
        salaRepository.delete(sala);
        return "Sala excluida com sucesso!";
    }

    public String excluirTodasAsSalas(){
        salaRepository.deleteAll();
        return "Salas excluidas com sucesso!";
    }


    //Private
    private SalaModel buscarSalaPorCodigo(Long codigo){
        return salaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Sala inexistente"));
    }

    private AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Aluno inexistente"));
    }

    private ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Professor inexistente"));
    }
}
