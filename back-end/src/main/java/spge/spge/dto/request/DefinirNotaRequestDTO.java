package spge.spge.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DefinirNotaRequestDTO {

    private Long codigoProfessor;
    private Long codigoAluno;
    private Integer numeroDoBimestre;
    private String materia;
    private Double nota;
}
