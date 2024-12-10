package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spge.spge.service.AulaService;

@RestController
@RequestMapping("/aula")
public class AulaController {

    @Autowired
    private AulaService aulaService;


    @GetMapping(path = "/professor/{codigoProfessor}")
    public ResponseEntity<?> buscarAulasDeUmProfessor(@PathVariable  Long codigoProfessor){
        return new ResponseEntity<>(aulaService.buscarAulasDeUmProfessor(codigoProfessor), HttpStatus.OK);
    }
}
