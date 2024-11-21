package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.model.MateriaModel;
import spge.spge.service.MateriaService;

@RestController
@RequestMapping("/materia")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;


    @GetMapping
    public ResponseEntity<?> listarMaterias(){
        return new ResponseEntity<>(materiaService.listarMaterias(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarMateria(@RequestBody MateriaModel materia){
        return new ResponseEntity<>(materiaService.salvarMateria(materia), HttpStatus.OK);
    }
}
