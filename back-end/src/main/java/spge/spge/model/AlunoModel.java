package spge.spge.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "alunos")
@Entity(name = "Aluno")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AlunoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String sala = "Sem";

    private String nome;

    private String rg;

    private String cpf;

    private String nomeDaMae;

    private String nomeDoPai;

    private String mes;
    private String dia;
    private String ano;

    private String ra;

    private String matricula;

    //Login
    private String email;
    private String senha;

    //Endereço
    private Integer cep;
    private String estado;
    private String cidade;
    private String bairro;
    private String rua;
    private Integer numero;
    private String complemento = "Sem complemento";

    //Desempenho
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "bimestres_id")
    private List<BimestreModel> historicoDeDesempenho = new ArrayList<>();
}
