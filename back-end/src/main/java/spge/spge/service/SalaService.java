package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.SalaRequestDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.*;
import spge.spge.repository.AlunoRepository;
import spge.spge.repository.ProfessorRepository;
import spge.spge.repository.SalaRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalaService {

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private AlunoRepository aLunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;


    public List<SalaModel> listarSalas(){
        return salaRepository.findAll();
    }

    public SalaModel buscarSalaPorCodigo(Long codigo){
        return salaRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Sala inexistente"));
    }

    public List<String> gerarListaDePresencaVaziaParaUmaSala(Long codigoSala){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        List<String> listaDePresenca = new ArrayList<>();

        for(AlunoModel aluno: aLunoRepository.listarAlunosDeUmaSala(sala.getCodigo())){
            listaDePresenca.add("F");
        }

        return listaDePresenca;
    }

    public SalaModel criarSala(SalaRequestDTO salaRequest){
        if(salaRepository.buscarSalaPorSerieEturma(salaRequest.getSerie(), salaRequest.getTurma()).isPresent()){
            throw new RequestException("Desculpe, esta sala já existe!");
        }

        SalaModel sala = new SalaModel();

        sala.setPeriodo(salaRequest.getPeriodo());
        sala.setSerie(salaRequest.getSerie());
        sala.setTurma(salaRequest.getTurma());

        for(String materia: salaRequest.getMaterias()){
            sala.getMaterias().add(materia);
        }

        return salaRepository.save(sala);
    }

    public SalaModel adicionarMateriaParaUmaSala(Long codigoSala, String materia){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);

        if(sala.getMaterias().contains(materia)){
            throw new RequestException("Esta sala já possui essa matéria!");
        }else{
            sala.getMaterias().add(materia);
        }

        return salaRepository.save(sala);
    }

    public SalaModel adicionarAlunoEmUmaSala(Long codigoSala, Long codigoAluno){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        AlunoModel aluno = buscarAlunoPorCodigo(codigoAluno);

        if(sala.getAlunos().contains(aluno)) {
            throw new RequestException("Desculpe, este aluno já faz parte desta sala!");
        }
        else if(aLunoRepository.buscarAlunoNasSalasPorCodigo(aluno.getCodigo()).isPresent()){
            throw new RequestException("Desculpe, este aluno já faz parte de uma sala!");
        }
        else {
            for (BimestreModel bimestre: aluno.getHistoricoDeDesempenho()){
                for(String materia: sala.getMaterias()){
                    if(aLunoRepository.buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno(
                        aluno.getCodigo(), bimestre.getNumeroDoBimestre(), materia
                    ).isEmpty()) {
                        bimestre.getDesempenho().add(new DesempenhoModel(
                            null,
                            materia,
                            0.0,//Nota
                            0,//Total de presenças
                            0//Total de aulas
                        ));
                    }
                };
            }

            aluno.setSala(String.valueOf(sala.getSerie()+""+sala.getTurma()));
            sala.getAlunos().add(aluno);
        }

        sala.setQuantidadeDeAlunos(sala.getQuantidadeDeAlunos() + 1);

        return salaRepository.save(sala);
    }

    public SalaModel removerAlunoDeUmaSala(Long codigoSala, Long codigoAluno){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        AlunoModel aluno = buscarAlunoPorCodigo(codigoAluno);

        if(sala.getAlunos().contains(aluno)) {
            aluno.setSala("Sem");
            sala.getAlunos().remove(aluno);
            sala.setQuantidadeDeAlunos(sala.getQuantidadeDeAlunos() - 1);
            return salaRepository.save(sala);
        }else{
            throw  new RequestException("Este aluno não faz parte destya sala!");
        }
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

    public SalaModel removerProfessorDeUmaSala(Long codigoSala, Long codigoProfessor){
        SalaModel sala = buscarSalaPorCodigo(codigoSala);
        ProfessorModel professor = buscarProfessorPorCodigo(codigoProfessor);

        if(sala.getProfessores().contains(professor)){
            sala.getProfessores().remove(professor);

            return salaRepository.save(sala);
        }else{
            throw new RequestException("Este professor nâo faz parte desta sala!");
        }
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
    private AlunoModel buscarAlunoPorCodigo(Long codigo){
        return aLunoRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Aluno inexistente"));
    }

    private ProfessorModel buscarProfessorPorCodigo(Long codigo){
        return professorRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Professor inexistente"));
    }
}
