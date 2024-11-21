package spge.spge.dto.request;

import lombok.Getter;
import lombok.Setter;
import spge.spge.model.MateriaModel;

import java.util.List;

@Getter
@Setter
public class SalaRequestDTO {

    private Integer serie;
    private Character turma;
    private List<MateriaModel> materias;
}
