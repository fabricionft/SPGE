package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AlunoModel;
import spge.spge.model.NotaModel;

import java.util.Optional;

@Repository
public interface ALunoRepository extends JpaRepository<AlunoModel, Long> {

    Optional<AlunoModel> findByCodigo(Long codigo);

    @Query(value = "select b from Aluno a inner join a.historicoDeNotas h inner join h.bimestres b where a.codigo =:codigoAluno and h.numeroDoBimestre = :numeroDoBimestre and b.materia = :materia")
    Optional<NotaModel> buscarNotaEspecificaEmBimestreEspecificoDeUmAluno(Long codigoAluno, Integer numeroDoBimestre, String materia);
}
