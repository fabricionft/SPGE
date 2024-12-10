package spge.spge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.dto.request.EnviarRecadoRequestDTO;
import spge.spge.service.RecadoService;

@RestController
@RequestMapping("/recado")
public class RecadoController {

    @Autowired
    private RecadoService recadoService;

    @GetMapping(path = "/sala/{codigoSala}")
    public ResponseEntity<?> buscarRecadosDeUmaSala(@PathVariable Long codigoSala){
        return new ResponseEntity<>(recadoService.buscarRecadosDeUmaSala(codigoSala), HttpStatus.OK);
    }

    @GetMapping(path = "/aluno/{codigoAluno}")
    public ResponseEntity<?> buscarRecadosDeUmAluno(@PathVariable Long codigoAluno){
        return new ResponseEntity<>(recadoService.buscarRecadosDeUmAluno(codigoAluno), HttpStatus.OK);
    }

    @PostMapping(path = "/paraSala")
    public ResponseEntity<?> enviarRecadoParaUmaSala(@RequestBody EnviarRecadoRequestDTO enviarRecadoRequest){
        return new ResponseEntity<>(recadoService.enviarRecadoParaUmaSala(enviarRecadoRequest), HttpStatus.CREATED);
    }

    @PostMapping(path = "/paraAluno")
    public ResponseEntity<?> enviarRecadoParaUmAluno(@RequestBody EnviarRecadoRequestDTO enviarRecadoRequest){
        return new ResponseEntity<>(recadoService.enviarRecadoParaUmAluno(enviarRecadoRequest), HttpStatus.CREATED);
    }
}
