package app.admin.audit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/audit")
public class AuditController {
    private final AuditService auditService;

    @GetMapping
    public List<AuditEventDTO> getAll() {
        return auditService.getAllEvents().stream().map(AuditEventDTO::new).collect(Collectors.toList());
    }
}
