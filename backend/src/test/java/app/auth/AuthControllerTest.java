package app.auth;

import app.admin.user.UserDTO;
import app.core.exceptions.LoginFailedException;
import app.core.exceptions.handler.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import static app.auth.AuthTestUnits.getLoginRequest;
import static app.core.endpoints.Endpoints.AUTH_ENDPOINT;
import static app.utils.AssertUtils.assertException;
import static app.utils.AssertUtils.assertGoodRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Value("${spring.security.user.name}")
    private String ROOT_USER_EMAIL;

    @Value("${spring.security.user.password}")
    private String ROOT_USER_PASSWORD;

    @Test
    void successfulLogin() {
        ResponseEntity<UserDTO> response = loginWithCredentials();

        UserDTO userDTO = response.getBody();

        assertAll(
            () -> assertGoodRequest(response),
            () -> assertThat(userDTO).isNotNull()
        );

        assertThat(userDTO.getEmail()).isEqualTo(ROOT_USER_EMAIL);
    }

    @Test
    void successfulLogout() {
        ResponseEntity<Void> response = restTemplate.postForEntity(
            AUTH_ENDPOINT + "/logout",
            null,
            Void.class
        );
        assertGoodRequest(response);
    }

    @Test
    void failedLoginWithWrongPassword() {
        assertException(
            loginWithWrongPassword(),
            new LoginFailedException()
        );
    }

    @Test
    void failedLoginWithWrongEmail() {
        assertException(
            loginWithWrongEmail(),
            new LoginFailedException()
        );
    }


    private ResponseEntity<ExceptionResponse> loginWithWrongPassword() {
        return restTemplate.postForEntity(
            AUTH_ENDPOINT + "/login",
            getLoginRequest(ROOT_USER_EMAIL, "wrongPassword"),
            ExceptionResponse.class
        );
    }

    private ResponseEntity<ExceptionResponse> loginWithWrongEmail() {
        return restTemplate.postForEntity(
            AUTH_ENDPOINT + "/login",
            getLoginRequest("wrongEmail", ROOT_USER_EMAIL),
            ExceptionResponse.class
        );
    }

    private ResponseEntity<UserDTO> loginWithCredentials() {
        return restTemplate.postForEntity(
            AUTH_ENDPOINT + "/login",
            getLoginRequest(ROOT_USER_EMAIL, ROOT_USER_PASSWORD),
            UserDTO.class
        );
    }
}
