package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AlunoModel;
import spge.spge.model.DesempenhoModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<AlunoModel, Long> {

    @Query(value = "select a from Sala s inner join s.alunos a where s.codigo = :codigo order by a.nome asc")
    List<AlunoModel> listarAlunosDeUmaSalaEmOrdemAlfabetica(Long codigo);

    @Query(value = "select a from Sala s inner join s.alunos a where a.codigo = :codigo")
    Optional<AlunoModel> buscarAlunoNasSalasPorCodigo(Long codigo);

    Optional<AlunoModel> findByCodigo(Long codigo);

    Optional<AlunoModel> findByEmail(String email);

    Optional<AlunoModel> findByCpf(String cpf);

    Optional<AlunoModel> findByRa(String ra);

    Optional<AlunoModel> findByMatricula(String matricula);

    @Query(value = "select d from Aluno a inner join a.historicoDeDesempenho h inner join h.desempenho d where a.codigo =:codigoAluno and h.numeroDoBimestre = :numeroDoBimestre and d.materia = :materia")
    Optional<DesempenhoModel> buscarDesempenhoEspecificoEmBimestreEspecificoDeUmAluno(Long codigoAluno, Integer numeroDoBimestre, String materia);
}
