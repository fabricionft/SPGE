package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.dto.request.DefinirNotaRequestDTO;
import spge.spge.model.ProfessorModel;
import spge.spge.service.ProfessorService;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;


    @GetMapping
    public ResponseEntity<?> listarProfessores(){
        return new ResponseEntity<>(professorService.listarProfessores(), HttpStatus.OK);
    }

    @GetMapping("/salas/{codigo}")
    public ResponseEntity<?> buscarSalasDeUmProfessor(@PathVariable Long codigo){
        return new ResponseEntity<>(professorService.buscarSalasDeUmProfessor(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarProfessor(@RequestBody ProfessorModel professor){
        return new ResponseEntity<>(professorService.salvarProfessor(professor), HttpStatus.CREATED);
    }

    @PutMapping(path = "/definirNota")
    public ResponseEntity<?> buscarsdf(@RequestBody DefinirNotaRequestDTO definirNota){
        return  new ResponseEntity<>(professorService.definirNotaDeUmAluno(definirNota), HttpStatus.OK);
    }
}
