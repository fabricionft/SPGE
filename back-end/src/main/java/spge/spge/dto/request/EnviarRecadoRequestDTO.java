package spge.spge.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnviarRecadoRequestDTO {

    private Long codigoSala;
    private Long codigoAluno;
    private String tipoRemetente;
    private String nomeRemetente;
    private String recado;
}
