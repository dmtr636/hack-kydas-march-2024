package app.admin.user;

import app.core.exceptions.ApiException;
import app.segment.SegmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static app.core.endpoints.Endpoints.SEGMENTS_ENDPOINT;
import static app.core.endpoints.Endpoints.USERS_ENDPOINT;

@RestController
@RequiredArgsConstructor
@RequestMapping(USERS_ENDPOINT)
public class UserController {
    private final UserService service;

    @GetMapping()
    public List<UserDTO> getALl() throws ApiException {
        return service.getAll().stream().map(UserDTO::new).toList();
    }
}
