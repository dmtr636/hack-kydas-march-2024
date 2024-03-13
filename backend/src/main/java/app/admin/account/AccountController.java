package app.admin.account;

import app.admin.user.UserDTO;
import app.core.exceptions.ApiException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/account")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping()
    public UserDTO currentUser() throws ApiException {
        return new UserDTO(accountService.getCurrentUser());
    }
}
