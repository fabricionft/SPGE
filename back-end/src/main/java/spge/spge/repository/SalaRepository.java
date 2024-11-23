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

    @Query(value = "select a from Sala s inner join s.alunos a where s.codigo = :codigo order by a.nome asc")
    List<AlunoModel> listarAlunosEmOrdemAlfabetica(Long codigo);
}
