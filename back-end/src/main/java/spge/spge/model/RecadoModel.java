package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "recados")
@Entity(name = "Recado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecadoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String data;

    private String tipoRemetente;

    private String nomeRemetente;

    private String publicoAlvo;

    private String salaAlvo;

    private String recado;
}
