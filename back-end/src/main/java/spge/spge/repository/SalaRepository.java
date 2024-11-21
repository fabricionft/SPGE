package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spge.spge.model.SalaModel;

import java.util.Optional;

@Repository
public interface SalaRepository extends JpaRepository<SalaModel, Long> {

    Optional<SalaModel> findByCodigo(Long codigo);
}
