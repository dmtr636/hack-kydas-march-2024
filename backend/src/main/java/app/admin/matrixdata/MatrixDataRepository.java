package app.admin.matrixdata;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatrixDataRepository extends JpaRepository<MatrixData, Long> {
    MatrixData findByMatrixIdAndLocationIdAndCategoryId(
        Long matrixId, Long locationId, Long categoryId
    );

    List<MatrixData> findAllByMatrixId(Long matrixId);

    List<MatrixData> findAllByMatrixIdAndCategoryIdInAndLocationIdIn(
        Long matrixId, List<Long> categoryIds, List<Long> locationIds
    );

    Boolean existsByMatrixIdAndCategoryIdInAndLocationIdIn(
        Long matrixId, List<Long> categoryIds, List<Long> locationIds
    );

    Long countByMatrixIdAndPriceIsNotNull(Long matrixId);

    @Query(value = "INSERT INTO matrix_data (matrix_id, price, location_id, category_id) " +
        "SELECT :toMatrixId, price, location_id, category_id FROM matrix_data WHERE matrix_id = :fromMatrixId",
        nativeQuery = true)
    @Modifying
    void cloneMatrixData(@Param("fromMatrixId") Long fromMatrixId, @Param("toMatrixId") Long toMatrixId);
}
