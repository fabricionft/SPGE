package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "desempenhos")
@Entity(name = "Desempenho")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DesempenhoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String materia;

    private Double nota;

    private Integer totalDeAulas;

    private Integer totalDePresencas;
}
