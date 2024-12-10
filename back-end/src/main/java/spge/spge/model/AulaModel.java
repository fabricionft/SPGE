package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Table(name = "aulas")
@Entity(name = "Aula")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AulaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String materia;
    private String data;
    private Integer quantidadeDeAulasContinuas;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "aulas_id")
    private List<PresencaModel> listaDePresenca;
}
