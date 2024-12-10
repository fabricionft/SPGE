package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "preencas")
@Entity(name = "Presenca")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PresencaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nomeAluno;
    private String presenca;
}
