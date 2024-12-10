package spge.spge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginProfessorResponseDTO {

    private Long codigo;
    private String nome;
    private String materia;
}
