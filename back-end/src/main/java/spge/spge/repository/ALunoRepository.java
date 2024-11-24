package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AlunoModel;
import spge.spge.model.DesempenhoModel;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<AlunoModel, Long> {

    Optional<AlunoModel> findByCodigo(Long codigo);

    Optional<AlunoModel> findByEmail(String email);

    Optional<AlunoModel> findByCpf(String cpf);

    @Query(value = "select d from Aluno a inner join a.historicoDeDesempenho h inner join h.desempenho d where a.codigo =:codigoAluno and h.numeroDoBimestre = :numeroDoBimestre and d.materia = :materia")
    Optional<DesempenhoModel> buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno(Long codigoAluno, Integer numeroDoBimestre, String materia);
}
