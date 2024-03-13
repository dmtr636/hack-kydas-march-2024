package app.admin.matrix;

import app.core.exceptions.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static app.core.endpoints.Endpoints.MATRICES_ENDPOINT;

@RequiredArgsConstructor
@RestController
@RequestMapping(MATRICES_ENDPOINT)
public class MatrixController {
    private final MatrixService service;

    @GetMapping
    public List<MatrixDTO> all() {
        List<Matrix> matrices = service.getAll();
        return matrices.stream().map(MatrixDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MatrixDTO getById(@PathVariable Long id) throws ApiException {
        return new MatrixDTO(service.getById(id));
    }

    @PostMapping
    public MatrixDTO create(@RequestBody @Valid MatrixDTO dto) throws ApiException {
        return new MatrixDTO(service.create(dto));
    }

    @PutMapping
    public MatrixDTO update(@RequestBody @Valid MatrixDTO dto) throws ApiException {
        return new MatrixDTO(service.update(dto));
    }

    @PostMapping("/clone")
    public MatrixDTO clone(@RequestBody @Valid MatrixCloneDTO dto) throws ApiException {
        return new MatrixDTO(service.clone(dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws ApiException {
        service.delete(id);
    }

    @PostMapping("/activate")
    public void delete(@RequestBody @Valid MatrixActivateDTO dto) throws ApiException {
        service.activate(dto);
    }
}
