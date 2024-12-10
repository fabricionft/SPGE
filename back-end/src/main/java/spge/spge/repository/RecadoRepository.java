package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spge.spge.model.RecadoModel;

import java.util.List;

@Repository
public interface RecadoRepository extends JpaRepository<RecadoModel, Long> {

    @Query(value = "select r from Sala s inner join s.recados r where s.codigo = :codigoSala order by r.codigo desc")
    List<RecadoModel> buscarRecadosDeUmaSala(Long codigoSala);

    @Query(value = "select r from Aluno a inner join a.recados r where a.codigo = :codigoAluno order by r.codigo desc")
    List<RecadoModel> buscarRecadosDeUmAluno(Long codigoAluno);

    @Query(value = "select r from Recado r where r.salaAlvo = :salaDoAluno")
    List<RecadoModel> buscarRecadosDaSalaDeUmAluno(String salaDoAluno);
}
