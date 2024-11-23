package spge.spge.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CriarAulaRequestDTO {

    private Long codigoSala;
    private Long codigoProfessor;
    private Integer numeroDoBimestre;
    private List<String> presencas;
    private Integer quantidadeDeAulas;
}
