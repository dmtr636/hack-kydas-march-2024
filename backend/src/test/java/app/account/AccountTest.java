package app.account;

import app.admin.user.UserDTO;
import app.utils.SecurityTestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import static app.core.endpoints.Endpoints.ACCOUNT_ENDPOINT;
import static app.utils.AssertUtils.assertDTO;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AccountTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SecurityTestUtils securityTestUtils;

    @BeforeEach
    void authenticateRestTemplate() {
        securityTestUtils.authenticateRestTemplateAsRootUser(restTemplate);
    }

    @Test
    void getCurrentUserInfo() {
        ResponseEntity<UserDTO> response = restTemplate.getForEntity(
            ACCOUNT_ENDPOINT,
            UserDTO.class
        );
        assertDTO(response, securityTestUtils.getRootUserDTO());
    }
}

