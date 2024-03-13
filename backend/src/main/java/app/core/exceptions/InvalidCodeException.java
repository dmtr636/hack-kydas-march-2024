package app.core.exceptions;

import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
public class InvalidCodeException extends ApiException {
    public InvalidCodeException(Integer remainingAttempts) {
        this.setData(Map.of("enterAttemptsLeft", remainingAttempts));
    }
}
