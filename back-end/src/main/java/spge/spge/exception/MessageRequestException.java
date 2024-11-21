package spge.spge.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequestException {

    private Integer status;
    private Date timestamp;
    private String error;
    private String message;
}
