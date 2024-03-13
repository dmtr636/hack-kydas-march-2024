package app.matrix;

import app.admin.matrix.Matrix;
import app.admin.matrix.MatrixDTO;
import app.utils.SecurityTestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import static app.core.endpoints.Endpoints.MATRICES_ENDPOINT;
import static app.utils.AssertUtils.assertGoodRequest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class MatrixTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SecurityTestUtils securityTestUtils;

    @BeforeEach
    void authenticateRestTemplate() {
        securityTestUtils.authenticateRestTemplateAsRootUser(restTemplate);
    }

    @Test
    void createMatrix() {
        ResponseEntity<MatrixDTO> response = restTemplate.postForEntity(
            MATRICES_ENDPOINT,
            new MatrixDTO()
                .setName("Test")
                .setType(Matrix.MatrixType.BASELINE),
            MatrixDTO.class
        );
        assertGoodRequest(response);
    }

    @Test
    void cloneMatrix() {
       restTemplate.postForEntity(
            MATRICES_ENDPOINT,
            new MatrixDTO()
                .setName("Test")
                .setType(Matrix.MatrixType.BASELINE),
            MatrixDTO.class
        );
        ResponseEntity<MatrixDTO> cloneResponse = restTemplate.postForEntity(
            MATRICES_ENDPOINT + "/clone/" + "1",
            null,
            MatrixDTO.class
        );
        assertGoodRequest(cloneResponse);
    }
}

