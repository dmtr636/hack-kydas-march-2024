package app.admin.audit;

import app.admin.matrix.Matrix;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {
    private final AuditEventRepository auditRepository;

    public List<AuditEvent> getAllEvents() {
        return auditRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public void addEvent(AuditEvent.EventType eventType, Matrix matrix, String userEmail) {
        AuditEvent auditEvent = new AuditEvent();
        auditEvent.setEventType(eventType);
        auditEvent.setUserEmail(userEmail);
        auditEvent.setName(matrix.getName());
        auditEvent.setMatrixId(matrix.getId());
        auditEvent.setStatus(matrix.getStatus());
        auditRepository.save(auditEvent);
    }
}
