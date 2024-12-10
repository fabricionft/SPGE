package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.AulaModel;

import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<AulaModel, Long> {

    @Query(value = "select a from Professor p inner join p.aulas a where p.codigo = :codigoProfessor order by a.codigo desc")
    List<AulaModel> buscarAulasDeUmProfessor(Long codigoProfessor);

}
