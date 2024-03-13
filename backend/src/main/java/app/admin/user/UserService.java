package app.admin.user;

import app.core.exceptions.AlreadyExistsException;
import app.core.exceptions.ApiException;
import app.core.exceptions.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() throws ApiException {
        return userRepository.findAll();
    }

    public User getById(Long id) throws ApiException {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public User create(UserDTO userDTO) throws ApiException {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new AlreadyExistsException();
        }

        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(encodedPassword);
        user.setRole(userDTO.getRole());

        return userRepository.save(user);
    }
}
