package app.admin.matrixdata;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class MatrixDataRequest {
    private Long locationId;
    private Long categoryId;
    private Long matrixId;
}
