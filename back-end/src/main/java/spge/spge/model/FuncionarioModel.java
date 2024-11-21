package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "funcionarios")
@Entity(name = "Funcionario")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FuncionarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Column
    private String nome;

    @Column
    private String email;

    @Column
    private String senha;
}
