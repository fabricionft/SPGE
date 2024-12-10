package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.dto.request.FazerChamadaRequestDTO;
import spge.spge.dto.request.DefinirNotaRequestDTO;
import spge.spge.dto.request.LoginProfessorRequestDTO;
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

    @GetMapping(path = "/listarProfessoresDeUmaSala/{codigoSala}")
    public ResponseEntity<?> listarProfessoresDeUmaSala(@PathVariable Long codigoSala){
        return new ResponseEntity<>(professorService.listarProfessoresDeumaSala(codigoSala), HttpStatus.OK);
    }

    @GetMapping(path = "/listarProfessoresQueNaoFazemParteDeDeterminadaSala/{codigoSala}")
    public ResponseEntity<?> listarProfessoresQueNaoFazemParteDeDeterminadaSala(@PathVariable Long codigoSala){
        return new ResponseEntity<>(professorService.listarProfessoresQueNaoFazemParteDeDeterminadaSala(codigoSala), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarProfessorPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(professorService.buscarProfessorPorCodigo(codigo), HttpStatus.OK);
    }

    @GetMapping("/salas/{codigo}")
    public ResponseEntity<?> buscarSalasDeUmProfessor(@PathVariable Long codigo){
        return new ResponseEntity<>(professorService.buscarSalasDeUmProfessor(codigo), HttpStatus.OK);
    }

    @PostMapping("/{primeiroSave}")
    public ResponseEntity<?> salvarProfessor(@RequestBody ProfessorModel professor,
                                             @PathVariable Boolean primeiroSave){
        return new ResponseEntity<>(professorService.salvarProfessor(professor, primeiroSave), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login") 
    public ResponseEntity<?> fazerLogin(@RequestBody LoginProfessorRequestDTO loginProfessorRequest){
        return new ResponseEntity<>(professorService.fazerLogin(loginProfessorRequest), HttpStatus.OK);
    }

    @PostMapping(path = "/fazerChamada")
    public  ResponseEntity<?> fazerChamada(@RequestBody FazerChamadaRequestDTO fazerChamadaRequest){
        return new ResponseEntity<>(professorService.fazerChamada(fazerChamadaRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/definirNota")
    public ResponseEntity<?> definirNota(@RequestBody DefinirNotaRequestDTO definirNota){
        return  new ResponseEntity<>(professorService.definirNotaDeUmAluno(definirNota), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    public ResponseEntity<?> excluirProfessorPorCodigo(@PathVariable Long codigo){
        return  new ResponseEntity<>(professorService.excluirProfessorPorCodigo(codigo), HttpStatus.OK);
    }
}
