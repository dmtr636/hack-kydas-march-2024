package app.admin.audit;

import app.admin.matrix.Matrix;
import app.admin.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Entity
public class AuditEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private Instant timestamp;

    private EventType eventType;

    private String name;

    private Long matrixId;

    private String userEmail;

    private Matrix.MatrixStatus status;

    public enum EventType {CHANGE_STATUS, CREATE_MATRIX, EDIT_MATRIX, CLONE_MATRIX}
}
