package app.admin.auth;

import app.admin.user.User;
import app.admin.user.UserDTO;
import app.core.exceptions.ApiException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static app.core.endpoints.Endpoints.AUTH_ENDPOINT;

@RestController
@RequestMapping(AUTH_ENDPOINT)
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public UserDTO login(
        @Valid @RequestBody LoginRequest data, HttpServletRequest request, HttpServletResponse response
    ) throws ApiException {
        User user = authService.login(data, request, response);
        return new UserDTO(user);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) throws ServletException {
        authService.logout(request);
    }
}
