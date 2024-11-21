package spge.spge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spge.spge.model.FuncionarioModel;

import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {

    Optional<FuncionarioModel> findByCodigo(Long codigo);

    Optional<FuncionarioModel> findByEmail(String email);
}
