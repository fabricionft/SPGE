package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "notas")
@Entity(name = "Nota")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NotaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String materia;

    private Integer nota;
}
