package app.utils;

import app.core.exceptions.ApiException;
import app.core.exceptions.handler.ErrorDetails;
import app.core.exceptions.handler.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

public class AssertUtils {

    public static void assertGoodRequest(ResponseEntity<?> response) {
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    public static void assertException(ResponseEntity<ExceptionResponse> response,
                                       ApiException expectedException) {
        ExceptionResponse exceptionResponse = response.getBody();
        assertThat(exceptionResponse).isNotNull();
        ErrorDetails errorDetails = exceptionResponse.getError();
        assertAll(
            () -> assertThat(response.getStatusCode()).isEqualTo(expectedException.getHttpStatus()),
            () -> assertThat(errorDetails.getCode()).isEqualTo(expectedException.getCode()),
            () -> assertThat(errorDetails.getData()).isEqualTo(expectedException.getData())
        );
    }

    public static void assertDTO(ResponseEntity<?> response, Object expectedDTO) {
        Object responseDTO = response.getBody();
        assertGoodRequest(response);
        assertThat(responseDTO).isNotNull();
        assertThat(responseDTO).usingRecursiveComparison().isEqualTo(expectedDTO);
    }
}
