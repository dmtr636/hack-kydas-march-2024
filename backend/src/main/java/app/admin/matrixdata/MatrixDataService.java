package app.admin.matrixdata;

import app.admin.category.Category;
import app.admin.category.CategoryService;
import app.admin.location.Location;
import app.admin.location.LocationService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class MatrixDataService {
    private final MatrixDataRepository repository;
    private final CategoryService categoryService;
    private final LocationService locationService;

    @PersistenceContext
    private final EntityManager entityManager;

    public void createEmptyMatrixData(Long matrixId) {
        MatrixData matrixData = new MatrixData();
        matrixData
            .setMatrixId(matrixId)
            .setCategoryId(1L)
            .setLocationId(1L)
            .setPrice(100);
        repository.save(matrixData);
    }

    @Transactional
    public void cloneMatrixData(Long fromMatrixId, Long toMatrixId) {
        repository.cloneMatrixData(fromMatrixId, toMatrixId);
    }

    public MatrixData getMatrixData(
        Long matrixId, Long locationId, Long categoryId
    ) {
        return repository.findByMatrixIdAndLocationIdAndCategoryId(
            matrixId, locationId, categoryId
        );
    }

    public Long getMatrixDataCount(Long matrixId) {
        return repository.countByMatrixIdAndPriceIsNotNull(matrixId);
    }

    public List<MatrixData> getMatrixDataWithChildNodes(
        Long matrixId, Long rootLocationId, Long rootCategoryId
    ) {
        List<Category> childCategories = categoryService.getChildCategories(rootCategoryId);
        List<Long> childCategoryIds = childCategories.stream().map(Category::getId).toList();
        List<Location> childLocations = locationService.getChildLocations(rootLocationId);
        List<Long> childLocationIds = childLocations.stream().map(Location::getId).toList();
        List<Long> categoryIds = Stream.concat(Stream.of(rootCategoryId), childCategoryIds.stream()).toList();
        List<Long> locationIds = Stream.concat(Stream.of(rootLocationId), childLocationIds.stream()).toList();

        return repository.findAllByMatrixIdAndCategoryIdInAndLocationIdIn(
            matrixId, categoryIds, locationIds
        );
    }

    public List<MatrixData> updateMatrixData(List<MatrixData> matrixData) {
        return repository.saveAll(matrixData);
    }

    public Boolean existsMatrixData(
        Long matrixId, List<Long> categoryIds, List<Long> locationIds
    ) {
        return repository.existsByMatrixIdAndCategoryIdInAndLocationIdIn(
            matrixId, categoryIds, locationIds
        );
    }
}
