package app.admin.matrix;

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
public class MatrixCloneDTO {
    @NotNull
    private Long id;

    @NotBlank
    private String newName;

    @NotNull
    private Matrix.MatrixType type;

    private Integer segmentId;
}
