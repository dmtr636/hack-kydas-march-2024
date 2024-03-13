package app.admin.audit;

import app.admin.matrix.Matrix;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
public class AuditEventDTO {
    private Long id;
    private String timestamp;
    private AuditEvent.EventType eventType;
    private String userEmail;
    private String name;
    private Long matrixId;
    private Matrix.MatrixStatus status;

    public AuditEventDTO(AuditEvent auditEvent) {
        this.id = auditEvent.getId();
        this.timestamp = auditEvent.getTimestamp().toString();
        this.eventType = auditEvent.getEventType();
        this.userEmail = auditEvent.getUserEmail();
        this.name = auditEvent.getName();
        this.matrixId = auditEvent.getMatrixId();
        this.status = auditEvent.getStatus();
    }
}
