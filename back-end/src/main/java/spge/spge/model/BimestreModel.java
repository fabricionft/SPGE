package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "bimestres")
@Entity(name = "bimestre")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BimestreModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private Integer numeroDoBimestre;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "notas_id")
    private List<NotaModel> bimestres = new ArrayList<>();
}
