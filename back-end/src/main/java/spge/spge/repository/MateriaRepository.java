package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spge.spge.model.MateriaModel;

import java.util.Optional;

@Repository
public interface MateriaRepository extends JpaRepository<MateriaModel, Long> {

    Optional<MateriaModel> findByCodigo(Long codigo);
    Optional<MateriaModel> findByMateria(String materia);
}
