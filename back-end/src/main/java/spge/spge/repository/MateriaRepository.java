package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spge.spge.model.MateriaModel;

@Repository
public interface MateriaRepository extends JpaRepository<MateriaModel, Long> {
}
