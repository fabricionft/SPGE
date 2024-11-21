package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping ResponseEntity<?> salvarAluno(@RequestBody AlunoModel aluno){
        return new ResponseEntity<>(alunoService.salvarAluno(aluno), HttpStatus.CREATED);
    }
}
