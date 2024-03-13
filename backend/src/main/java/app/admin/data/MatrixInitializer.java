package app.admin.data;

import app.admin.matrix.Matrix;
import app.admin.matrix.MatrixActivateDTO;
import app.admin.matrix.MatrixDTO;
import app.admin.matrix.MatrixService;
import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MatrixInitializer {

    private final MatrixService service;

    public void createMatrices() throws ApiException {
        service.create(new MatrixDTO()
            .setId(1L)
            .setName("Альфа-центавра")
            .setType(Matrix.MatrixType.BASELINE)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
        );
        service.create(new MatrixDTO()
            .setId(2L)
            .setName("Млечный путь")
            .setType(Matrix.MatrixType.BASELINE)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
        );
        service.create(new MatrixDTO()
            .setId(3L)
            .setName("Андромеда")
            .setType(Matrix.MatrixType.BASELINE)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
        );
        service.create(new MatrixDTO()
            .setId(4L)
            .setName("Созвездие")
            .setType(Matrix.MatrixType.DISCOUNT)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
            .setSegmentId(156)
        );
        service.create(new MatrixDTO()
            .setId(5L)
            .setName("Небосвод")
            .setType(Matrix.MatrixType.DISCOUNT)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
            .setSegmentId(168)
        );
        service.create(new MatrixDTO()
            .setId(6L)
            .setName("Галактика")
            .setType(Matrix.MatrixType.DISCOUNT)
            .setStatus(Matrix.MatrixStatus.INACTIVE)
            .setSegmentId(180)
        );
    }

    public void activateMatrices() throws ApiException {
        service.activate(new MatrixActivateDTO()
            .setBaselineMatrixId(2L)
            .setDiscountMatrixIds(List.of(4L, 5L, 6L))
        );
    }
}
