package app.price;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class PriceResponse {
    private Integer price;
    private Long location_id;
    private Long microcategory_id;
    private Long matrix_id;
    private Integer user_segment_id;
}
