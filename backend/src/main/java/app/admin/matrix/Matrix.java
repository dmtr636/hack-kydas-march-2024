package app.admin.matrix;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Accessors(chain = true)
@Entity
public class Matrix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private MatrixType type;

    @Column(nullable = false)
    private MatrixStatus status;

    @CreationTimestamp
    private Instant createDate;

    public Long priceCount;

    public Integer segmentId;

    public enum MatrixType {BASELINE, DISCOUNT}

    public enum MatrixStatus {ACTIVE, INACTIVE, DRAFT}
}
