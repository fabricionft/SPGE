package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String data;
    private Integer quantidadeDeAulasContinuas;
}
