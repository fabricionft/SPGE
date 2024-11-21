package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "salas")
@Entity(name = "Sala")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SalaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private Integer serie;
    private Character turma;
    private Integer quantidadeDeAlunos = 0;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "alunos_id")
    private List<AlunoModel> alunos = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.REMOVE)
    private List<ProfessorModel> professores = new ArrayList<>();

    private List<String> materias = new ArrayList<>();
}
