package app.core.security;

import app.core.exceptions.ApiException;
import app.admin.user.User;
import app.admin.user.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityContext {
    private final UserService userService;

    public SecurityContext(UserService userService) {
        this.userService = userService;
    }

    public User getCurrentUser() throws ApiException {
        UserDetailsImpl userDetails = (UserDetailsImpl) getAuthentication().getPrincipal();
        return userService.getById(userDetails.getUser().getId());
    }

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
