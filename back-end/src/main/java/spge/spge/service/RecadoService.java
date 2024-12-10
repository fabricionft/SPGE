package spge.spge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spge.spge.dto.request.EnviarRecadoRequestDTO;
import spge.spge.exception.RequestException;
import spge.spge.model.AlunoModel;
import spge.spge.model.RecadoModel;
import spge.spge.model.SalaModel;
import spge.spge.repository.AlunoRepository;
import spge.spge.repository.RecadoRepository;
import spge.spge.repository.SalaRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class RecadoService {

    @Autowired
    private RecadoRepository recadoRepository;

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    public List<RecadoModel> buscarRecadosDeUmaSala(Long codigoSala){
        return  recadoRepository.buscarRecadosDeUmaSala(codigoSala);
    }

    public List<RecadoModel> buscarRecadosDeUmAluno(Long codigoAluno){
        AlunoModel aluno = buscarAlunoPorCodigo(codigoAluno);
        List<RecadoModel> recadosDaSalaDoAluno = recadoRepository.buscarRecadosDaSalaDeUmAluno(aluno.getSala());
        List<RecadoModel> recadoaDoAluno = recadoRepository.buscarRecadosDeUmAluno(aluno.getCodigo());

        for(RecadoModel recado: recadosDaSalaDoAluno){
            recadoaDoAluno.add(recado);
        }

        return recadoaDoAluno;
    }


    public SalaModel enviarRecadoParaUmaSala(EnviarRecadoRequestDTO enviarRecadoRequestDTO){
        SalaModel sala = buscarSalaPorCodigo(enviarRecadoRequestDTO.getCodigoSala());
        SimpleDateFormat formatardata = new SimpleDateFormat("dd/MM/yyyy");

        RecadoModel recado = new RecadoModel(
            null,
            formatardata.format(new Date()),
            enviarRecadoRequestDTO.getTipoRemetente(),
            enviarRecadoRequestDTO.getNomeRemetente(),
            "sala",
            String.valueOf(sala.getSerie()+""+sala.getTurma()),
            enviarRecadoRequestDTO.getRecado()
        );

        recadoRepository.save(recado);
        sala.getRecados().add(recado);

        return salaRepository.save(sala);
    }

    public AlunoModel enviarRecadoParaUmAluno(EnviarRecadoRequestDTO enviarRecadoRequestDTO){
        AlunoModel aluno = buscarAlunoPorCodigo(enviarRecadoRequestDTO.getCodigoAluno());
        SimpleDateFormat formatardata = new SimpleDateFormat("dd/MM/yyyy");

        RecadoModel recado = new RecadoModel(
            null,
            formatardata.format(new Date()),
            enviarRecadoRequestDTO.getTipoRemetente(),
            enviarRecadoRequestDTO.getNomeRemetente(),
            "aluno",
            null,
            enviarRecadoRequestDTO.getRecado()
        );

        recadoRepository.save(recado);
        aluno.getRecados().add(recado);

        return alunoRepository.save(aluno);
    }


    //Privados
    private SalaModel buscarSalaPorCodigo(Long codigo){
        return salaRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Sala inexistente"));
    }

    private AlunoModel buscarAlunoPorCodigo(Long codigo){
        return alunoRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Aluno inexistente"));
    }
}
