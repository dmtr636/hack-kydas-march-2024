package app.admin.matrixdata;

import app.core.exceptions.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static app.core.endpoints.Endpoints.MATRIX_DATA_ENDPOINT;

@RequiredArgsConstructor
@RestController
@RequestMapping(MATRIX_DATA_ENDPOINT)
public class MatrixDataController {
    private final MatrixDataService service;

    @PostMapping()
    public List<MatrixData> getMatrixData(@Valid @RequestBody MatrixDataRequest request) throws ApiException {
        return service.getMatrixDataWithChildNodes(
            request.getMatrixId(),
            request.getLocationId(),
            request.getCategoryId()
        );
    }

    @PutMapping
    public List<MatrixData> updateMatrixData(@RequestBody List<MatrixData> matrixData) throws ApiException {
        return service.updateMatrixData(matrixData);
    }
}
