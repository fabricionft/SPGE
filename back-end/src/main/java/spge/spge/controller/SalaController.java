package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.dto.request.SalaRequestDTO;
import spge.spge.model.MateriaModel;
import spge.spge.model.SalaModel;
import spge.spge.service.SalaService;

import java.util.List;

@RestController
@RequestMapping("/sala")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @GetMapping
    public ResponseEntity<?> listarSalas(){
        return new ResponseEntity<>(salaService.listarSalas(), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarSalaPorCodigo(@PathVariable  Long codigo){
        return new ResponseEntity<>(salaService.buscarSalaPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> criarSala(@RequestBody SalaRequestDTO salaRequestDTO){
        return new ResponseEntity<>(salaService.criarSala(salaRequestDTO), HttpStatus.CREATED);
    }

    @PostMapping(path = "/codigoSala/{codigoSala}/materia/{materia}")
    public  ResponseEntity<?> adicionarMateriaParaUmaSala(@PathVariable Long codigoSala,
                                                          @PathVariable String materia){
        return new ResponseEntity<>(salaService.adicionarMateriaParaUmaSala(codigoSala, materia), HttpStatus.CREATED);
    }

    @PostMapping(path = "/codigoSala/{codigoSala}/codigoAluno/{codigoAluno}")
    public  ResponseEntity<?> adicionarAlunoEmUmaSala(@PathVariable Long codigoSala,
                                                      @PathVariable Long codigoAluno){
        return new ResponseEntity<>(salaService.adicionarAlunoEmUmaSala(codigoSala, codigoAluno), HttpStatus.CREATED);
    }

    @PostMapping(path = "/codigoSala/{codigoSala}/codigoProfessor/{codigoProfessor}")
    public  ResponseEntity<?> adicionarProfessorEmUmaSala(@PathVariable Long codigoSala,
                                                          @PathVariable Long codigoProfessor){
        return new ResponseEntity<>(salaService.adicionarProfessorEmUmaSala(codigoSala, codigoProfessor), HttpStatus.CREATED);
    }

    @PutMapping(path = "/remover/codigoSala/{codigoSala}/codigoAluno/{codigoAluno}")
    public  ResponseEntity<?> removerAlunoDeUmaSala(@PathVariable Long codigoSala,
                                                    @PathVariable Long codigoAluno){
        return new ResponseEntity<>(salaService.removerAlunoDeUmaSala(codigoSala, codigoAluno), HttpStatus.OK);
    }

    @PutMapping(path = "/remover/codigoSala/{codigoSala}/codigoProfessor/{codigoProfessor}")
    public  ResponseEntity<?> removerProfessorDeUmaSala(@PathVariable Long codigoSala,
                                                        @PathVariable Long codigoProfessor){
        return new ResponseEntity<>(salaService.removerProfessorDeUmaSala(codigoSala, codigoProfessor), HttpStatus.OK);
    }

    @DeleteMapping
    public  ResponseEntity<?> excluirTodasAsSalas(){
        return new ResponseEntity<>(salaService.excluirTodasAsSalas(), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    public  ResponseEntity<?> excluirSalaPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(salaService.excluirSalaPorCodigo(codigo), HttpStatus.OK);
    }
}
