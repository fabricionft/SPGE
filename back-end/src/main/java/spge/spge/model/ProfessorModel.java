package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "professores")
@Entity(name = "Professor")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProfessorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nome;

    private String materia;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "aulss_id")
    private List<AulaModel> aulas = new ArrayList<>();
}
