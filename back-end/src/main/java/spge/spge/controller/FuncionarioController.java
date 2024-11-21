package spge.spge.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spge.spge.config.ModelMapperConfig;
import spge.spge.dto.response.FuncionarioResponseDTO;
import spge.spge.model.FuncionarioModel;
import spge.spge.service.FuncionarioService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping
    public ResponseEntity<?> listarFuncionarios(){
        return new ResponseEntity<>(converterListaDeModelEmListaDeResponseDTO(funcionarioService.listarFuncionarios()), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarFuncionarioPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(converterModelEmResponseDTO(funcionarioService.buscarFuncionarioPorCodigo(codigo)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarFuncionario(@RequestBody FuncionarioModel funcionario){
        return new ResponseEntity<>(converterModelEmResponseDTO(funcionarioService.salvarFuncionario(funcionario)), HttpStatus.CREATED);
    }


    //Private
    private FuncionarioResponseDTO converterModelEmResponseDTO(FuncionarioModel funcionario){
        return  modelMapper.map(funcionario, FuncionarioResponseDTO.class);
    }

    private List<FuncionarioResponseDTO> converterListaDeModelEmListaDeResponseDTO(List<FuncionarioModel> funcionarios){
        List<FuncionarioResponseDTO> funcionariosDTO = new ArrayList<>();

        for(FuncionarioModel funcionario: funcionarios){
            funcionariosDTO.add( modelMapper.map(funcionario, FuncionarioResponseDTO.class));
        }
        return  funcionariosDTO;
    }
}
