package app.admin.matrix;

import app.admin.audit.AuditEvent;
import app.admin.audit.AuditService;
import app.admin.matrixdata.MatrixDataService;
import app.admin.user.User;
import app.core.exceptions.ApiException;
import app.core.exceptions.NotFoundException;
import app.core.security.SecurityContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatrixService {
    private final MatrixRepository repository;
    private final MatrixDataService matrixDataService;
    private final SecurityContext securityContext;
    private final AuditService auditService;

    public List<Matrix> getAll() {
        List<Matrix> matrices = repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        matrices.forEach(matrix ->
            matrix.setPriceCount(matrixDataService.getMatrixDataCount(matrix.getId()))
        );
        return matrices;
    }

    public Matrix getActiveBaselineMatrix() throws ApiException {
        return repository
            .findAllByStatusAndTypeOrderByIdDesc(Matrix.MatrixStatus.ACTIVE, Matrix.MatrixType.BASELINE)
            .stream()
            .findFirst()
            .orElseThrow(() -> new ApiException().setMessage("No active baseline"));
    }

    public List<Matrix> getActiveDiscountMatrices() throws ApiException {
        return repository.findAllByStatusAndTypeOrderByIdDesc(
            Matrix.MatrixStatus.ACTIVE, Matrix.MatrixType.DISCOUNT
        );
    }

    public Matrix getById(Long id) throws ApiException {
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Transactional
    public Matrix create(MatrixDTO dto) throws ApiException {
        Matrix matrix = new Matrix()
            .setName(dto.getName())
            .setType(dto.getType())
            .setStatus(dto.getStatus())
            .setSegmentId(dto.getSegmentId());
        matrix = repository.save(matrix);
        auditService.addEvent(
            AuditEvent.EventType.CREATE_MATRIX,
            matrix,
            securityContext.getCurrentUser().getEmail()
        );
        if (dto.getId() == null) {
            matrixDataService.createEmptyMatrixData(matrix.getId());
        }
        return matrix;
    }

    public Matrix update(MatrixDTO dto) throws ApiException {
        Matrix matrix = repository.findById(dto.getId()).orElseThrow(NotFoundException::new);
        matrix
            .setName(dto.getName())
            .setSegmentId(dto.getSegmentId());
        auditService.addEvent(
            AuditEvent.EventType.EDIT_MATRIX,
            matrix,
            securityContext.getCurrentUser().getEmail()
        );
        return repository.save(matrix);
    }

    @Transactional
    public Matrix clone(MatrixCloneDTO dto) throws ApiException {
        Matrix matrix = repository.findById(dto.getId()).orElseThrow(NotFoundException::new);
        Long priceCount = matrixDataService.getMatrixDataCount(matrix.getId());
        Matrix clonedMatrix = new Matrix()
            .setName(dto.getNewName())
            .setType(dto.getType())
            .setStatus(Matrix.MatrixStatus.DRAFT)
            .setPriceCount(priceCount)
            .setSegmentId(dto.getSegmentId());
        clonedMatrix = repository.save(clonedMatrix);
        matrixDataService.cloneMatrixData(matrix.getId(), clonedMatrix.getId());
        auditService.addEvent(
            AuditEvent.EventType.CLONE_MATRIX,
            clonedMatrix,
            securityContext.getCurrentUser().getEmail()
        );
        return clonedMatrix;
    }

    public void delete(Long id) throws ApiException {
        Matrix matrix = repository.findById(id).orElseThrow(NotFoundException::new);
        if (matrix.getStatus() != Matrix.MatrixStatus.DRAFT) {
            throw new ApiException().setMessage("Matrix is not DRAFT");
        }
        repository.deleteById(id);
    }

    @Transactional
    public void activate(MatrixActivateDTO dto) throws ApiException {
        List<Matrix> oldActiveMatrices = repository.findAllByStatus(Matrix.MatrixStatus.ACTIVE);
        oldActiveMatrices.forEach(matrix -> matrix.setStatus(Matrix.MatrixStatus.INACTIVE));
        repository.saveAll(oldActiveMatrices);

        Matrix newBaselineMatrix = repository
            .findById(dto.getBaselineMatrixId())
            .orElseThrow(NotFoundException::new);
        if (newBaselineMatrix.getType() != Matrix.MatrixType.BASELINE) {
            throw new ApiException().setMessage("Baseline matrix is not BASELINE");
        }
        newBaselineMatrix.setStatus(Matrix.MatrixStatus.ACTIVE);
        repository.save(newBaselineMatrix);

        List<Matrix> newDiscountMatrices = repository.findAllByIdIn(dto.getDiscountMatrixIds());
        if (newDiscountMatrices.stream().anyMatch(matrix -> matrix.getType() != Matrix.MatrixType.DISCOUNT)) {
            throw new ApiException().setMessage("Discount matrix is not DISCOUNT");
        }
        newDiscountMatrices.forEach(matrix -> matrix.setStatus(Matrix.MatrixStatus.ACTIVE));
        repository.saveAll(newDiscountMatrices);

        User currentUser = securityContext.getCurrentUser();
        auditService.addEvent(
            AuditEvent.EventType.CHANGE_STATUS,
            newBaselineMatrix,
            currentUser.getEmail()
        );
        newDiscountMatrices.forEach(
            matrix -> auditService.addEvent(
                AuditEvent.EventType.CHANGE_STATUS,
                matrix,
                currentUser.getEmail()
            )
        );
    }
}
