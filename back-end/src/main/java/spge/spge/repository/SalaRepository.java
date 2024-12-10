package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AlunoModel;
import spge.spge.model.SalaModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalaRepository extends JpaRepository<SalaModel, Long> {

    Optional<SalaModel> findByCodigo(Long codigo);

    @Query(value = "select s from Sala s inner join s.alunos a where a.codigo = :codigoAluno")
    Optional<SalaModel> buscarSalaDeUmAluno(Long codigoAluno);

    @Query(value = "select s from Sala s where s.serie = :serie and s.turma = :turma")
    Optional<SalaModel> buscarSalaPorSerieEturma(Integer serie, Character turma);
}
