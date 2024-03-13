package app.price;

import app.admin.category.Category;
import app.admin.category.CategoryService;
import app.admin.location.Location;
import app.admin.location.LocationService;
import app.admin.matrix.Matrix;
import app.admin.matrix.MatrixService;
import app.admin.matrixdata.MatrixData;
import app.admin.matrixdata.MatrixDataService;
import app.core.exceptions.ApiException;
import app.segment.SegmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final SegmentService segmentService;
    private final LocationService locationService;
    private final CategoryService categoryService;
    private final MatrixService matrixService;
    private final MatrixDataService matrixDataService;

    public PriceResponse getPrice(PriceRequest request) throws ApiException {
        Long locationId = request.getLocation_id();
        Long categoryId = request.getMicrocategory_id();

        // Получение списка идентификаторов вершин дерева категорий, которые
        // составляют путь от заданной категории до ROOT категории
        List<Long> categoryPathIds = getCategoryPathIds(categoryId);

        // Аналогично для дерева локаций
        List<Long> locationPathIds = getLocationPathIds(locationId);

        // Получение списка матриц (Baseline и Discount), которые соотвествуют
        // данному пользователю (на основании сегмента, к которому принадлежит пользователь)
        List<Matrix> matrices = getMatrices(request.getUser_id());

        // Перебор всех матриц (в списке сначала идут Discount матрицы)
        for (Matrix matrix : matrices) {

            // Выполнение проверки, что существует цена хотя бы для одной пары локация-категория
            // из сформированных списков categoryPathIds, locationPathIds
            // В случае, если цена не найдена, то данную матрицу можно не рассматривать,
            // так как поиск вверх по дереву гарантированно не найдёт цену
            if (!matrixDataService.existsMatrixData(
                matrix.getId(), categoryPathIds, locationPathIds
            )) {
                continue;
            }

            // Выполнение поиска вверх по дереву
            MatrixData matrixData = searchUpTree(matrix, locationPathIds, categoryPathIds);

            // Если цена найдена, то возвращается ответ
            // Иначе процедура повторяется для следующей матрицы
            if (matrixData != null && matrixData.getPrice() != null) {
                return new PriceResponse()
                    .setPrice(matrixData.getPrice())
                    .setLocation_id(matrixData.getLocationId())
                    .setMicrocategory_id(matrixData.getCategoryId())
                    .setMatrix_id(matrix.getId())
                    .setUser_segment_id(matrix.getSegmentId());
            }
        }

        throw new ApiException().setMessage("Failed to get price");
    }

    private List<Matrix> getMatrices(Integer userId) throws ApiException {
        List<Integer> segmentIds = segmentService.getSegmentIdsByUserId(userId);
        Matrix baselineMatrix = matrixService.getActiveBaselineMatrix();
        List<Matrix> discountMatrices = matrixService.getActiveDiscountMatrices().stream().filter(
            matrix -> segmentIds.contains(matrix.getSegmentId())
        ).toList();
        return Stream.concat(
            discountMatrices.stream(), Stream.of(baselineMatrix)
        ).toList();
    }

    private List<Long> getCategoryPathIds(Long categoryId) {
        List<Long> categoryIds = new ArrayList<>();
        Category category = categoryService.getById(categoryId).orElse(null);
        while (category != null) {
            categoryIds.add(category.getId());
            Long parentCategoryId = category.getParentCategoryId();
            if (parentCategoryId != null) {
                category = categoryService.getById(parentCategoryId).orElse(null);
            } else {
                category = null;
            }
        }
        Collections.reverse(categoryIds);
        return categoryIds;
    }

    private List<Long> getLocationPathIds(Long locationId) {
        List<Long> locationIds = new ArrayList<>();
        Location location = locationService.getById(locationId).orElse(null);
        while (location != null) {
            locationIds.add(location.getId());
            Long parentLocationId = location.getParentLocationId();
            if (parentLocationId != null) {
                location = locationService.getById(parentLocationId).orElse(null);
            } else {
                location = null;
            }
        }
        Collections.reverse(locationIds);
        return locationIds;
    }

    private MatrixData searchUpTree(Matrix matrix, List<Long> locationPathIds, List<Long> categoryPathIds) {
        for (Long locationId : locationPathIds) {
            for (Long categoryId : categoryPathIds) {
                MatrixData matrixData = matrixDataService.getMatrixData(
                    matrix.getId(), locationId, categoryId
                );
                if (matrixData != null) {
                    return matrixData;
                }
            }
        }
        return null;
    }
}
