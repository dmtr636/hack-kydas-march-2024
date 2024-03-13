package app.admin.matrix;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class MatrixActivateDTO {
    @NotNull
    private Long baselineMatrixId;

    @NotNull
    private List<Long> discountMatrixIds;
}
