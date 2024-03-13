package app.admin.matrixdata;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@Entity
@Table(
    name = "matrix_data",
    indexes = {
        @Index(columnList = "matrixId, categoryId, locationId", unique = true),
        @Index(columnList = "matrixId")
    }
)
public class MatrixData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matrixId;

    private Long categoryId;

    private Long locationId;

    private Integer price;
}
