package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AlunoModel;
import spge.spge.model.ProfessorModel;
import spge.spge.model.SalaModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<ProfessorModel, Long> {

    @Query(value = "select p from Sala s inner join s.professores p where s.codigo = :codigoSala")
    List<ProfessorModel> listarProfessoresDeUmaSala(Long codigoSala);

    Optional<ProfessorModel> findByCodigo(Long codigo);

    Optional<ProfessorModel> findByEmail(String email);

    @Query(value = "select p from Sala s inner join s.professores p where s.codigo = :codigoSala")
    Optional<ProfessorModel> buscarProfessorEmDeterminadaSala(Long codigoSala);

    @Query(value = "select p from Professor p where p.cpf = :cpf and p.materia = :materia")
    Optional<ProfessorModel> buscarProfessorPorCpfEMateria(String cpf, String materia);

    @Query(value = "select s from Sala s inner join s.professores p where p.codigo = :codigo")
    List<SalaModel> buscarSalasQueOProfessorFazParte(Long codigo);

    @Query(value = "select a from Sala s inner join s.alunos a inner join s.professores p where a.codigo = :codigoAluno and p.codigo = :codigoProfessor")
    Optional<AlunoModel> buscarAlunoDeUmProfessor(Long codigoAluno, Long codigoProfessor);
}
