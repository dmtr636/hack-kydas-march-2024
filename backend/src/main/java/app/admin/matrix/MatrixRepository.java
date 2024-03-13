package app.admin.matrix;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatrixRepository extends JpaRepository<Matrix, Long> {
    List<Matrix> findAllByIdIn(List<Long> ids);
    List<Matrix> findAllByStatus(Matrix.MatrixStatus status);
    List<Matrix> findAllByStatusAndTypeOrderByIdDesc(Matrix.MatrixStatus status, Matrix.MatrixType type);
}
