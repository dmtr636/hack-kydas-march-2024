package app.admin.data;

import app.admin.user.UserDTO;
import app.admin.user.UserRepository;
import app.admin.user.UserService;
import app.core.exceptions.ApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserInitializer {

    private final UserService userService;
    private final UserRepository userRepository;

    @Value("${spring.security.user.name}")
    private String adminUserEmail;

    @Value("${spring.security.user.password}")
    private String adminUserPassword;

    public boolean isAdminUserExists() {
        return userRepository.existsByEmail(adminUserEmail);
    }

    public void createUsers() throws ApiException {
        createUser(adminUserEmail, adminUserPassword, "Администратор");
        createUser("analyst1@hack-kydas.ru", adminUserPassword, "Аналитик");
        createUser("analyst2@hack-kydas.ru", adminUserPassword, "Аналитик");
    }

    private void createUser(String email, String password, String role)
        throws ApiException {
        UserDTO user = new UserDTO();
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        userService.create(user);
    }
}
