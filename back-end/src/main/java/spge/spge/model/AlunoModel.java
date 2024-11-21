package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "alunos")
@Entity(name = "Aluno")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AlunoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nome;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "bimestres_id")
    private List<BimestreModel> historicoDeNotas = new ArrayList<>();
}
