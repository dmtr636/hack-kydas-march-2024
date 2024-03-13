package app.admin.account;

import app.core.exceptions.ApiException;
import app.core.security.SecurityContext;
import app.admin.user.User;
import app.admin.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final SecurityContext securityContext;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AccountService(SecurityContext securityContext, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.securityContext = securityContext;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getCurrentUser() throws ApiException {
        return securityContext.getCurrentUser();
    }
}
