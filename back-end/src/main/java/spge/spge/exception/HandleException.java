package spge.spge.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class HandleException {

    @ExceptionHandler(RequestException.class)
    public ResponseEntity<?> tratarErros(Exception exception){
        MessageRequestException message = new MessageRequestException(
            401,
            new Date(),
            "Não autorizado",
            exception.getMessage()
        );

        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }
}
