package app.admin.matrix;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class MatrixDTO {
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Matrix.MatrixType type;

    private Matrix.MatrixStatus status = Matrix.MatrixStatus.DRAFT;

    private String createDate;

    private Long priceCount;

    private Integer segmentId;

    public MatrixDTO(Matrix matrix) {
        this.id = matrix.getId();
        this.name = matrix.getName();
        this.type = matrix.getType();
        this.status = matrix.getStatus();
        this.segmentId = matrix.getSegmentId();
        this.createDate = matrix.getCreateDate().toString();
        this.priceCount = matrix.getPriceCount();
    }
}
