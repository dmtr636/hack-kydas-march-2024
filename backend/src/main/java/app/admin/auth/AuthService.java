package app.admin.auth;

import app.admin.user.User;
import app.core.exceptions.ApiException;
import app.core.exceptions.LoginFailedException;
import app.core.security.SecurityContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final RememberMeServices rememberMeServices;
    private final SecurityContext securityContext;

    public AuthService(RememberMeServices rememberMeServices, SecurityContext securityContext) {
        this.rememberMeServices = rememberMeServices;
        this.securityContext = securityContext;
    }

    public User login(LoginRequest data, HttpServletRequest request, HttpServletResponse response) throws ApiException {
        authenticateUser(data.getEmail(), data.getPassword(), request);
        if (data.getRememberMe()) {
            rememberMeServices.loginSuccess(request, response, securityContext.getAuthentication());
        }
        return securityContext.getCurrentUser();
    }

    public void logout(HttpServletRequest request) throws ServletException {
        request.logout();
    }

    private void authenticateUser(String email, String password, HttpServletRequest request) throws ApiException {
        try {
            request.logout();
            request.login(email, password);
        } catch (ServletException e) {
            throw new LoginFailedException();
        }
    }
}
