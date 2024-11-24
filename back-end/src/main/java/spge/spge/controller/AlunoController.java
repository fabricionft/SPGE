package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.dto.request.LoginAlunoRequestDTO;
import spge.spge.model.AlunoModel;
import spge.spge.service.AlunoService;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;


    @GetMapping
    public ResponseEntity<?> listarAlunos(){
        return new ResponseEntity<>(alunoService.listarAlunos(), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarAlunoPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(alunoService.buscarAlunoPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping ResponseEntity<?> salvarAluno(@RequestBody AlunoModel aluno){
        return new ResponseEntity<>(alunoService.salvarAluno(aluno), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> fazerLogin(@RequestBody LoginAlunoRequestDTO loginAlunoRequest){
        return new ResponseEntity<>(alunoService.fazerLogin(loginAlunoRequest), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    public ResponseEntity<?> excluirAluno(@PathVariable Long codigo){
        return new ResponseEntity<>(alunoService.excluirALuno(codigo), HttpStatus.OK);
    }
}
