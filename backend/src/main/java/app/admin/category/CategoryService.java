package app.admin.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;

    public List<Category> getAll() {
        return repository.findAll();
    }

    public List<Category> getChildCategories(Long categoryId) {
        return repository.findAllByParentCategoryId(categoryId);
    }

    public Optional<Category> getById(Long id) {
        return repository.findById(id);
    }

    public Category create(Category category) {
        return repository.save(category);
    }

    public void createAll(List<Category> categories) {
        repository.saveAll(categories);
    }
}
