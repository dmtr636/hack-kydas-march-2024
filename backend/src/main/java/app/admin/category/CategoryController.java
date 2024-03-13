package app.admin.category;

import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static app.core.endpoints.Endpoints.CATEGORIES_ENDPOINT;

@RestController
@RequiredArgsConstructor
@RequestMapping(CATEGORIES_ENDPOINT)
public class CategoryController {
    private final CategoryService service;

    @GetMapping()
    public List<Category> getALl() throws ApiException {
        return service.getAll();
    }
}
