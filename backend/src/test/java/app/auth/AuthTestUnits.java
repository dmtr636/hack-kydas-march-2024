package app.auth;

import app.admin.auth.LoginRequest;

public class AuthTestUnits {
    public static LoginRequest getLoginRequest(String email, String password) {
        return new LoginRequest()
            .setEmail(email)
            .setPassword(password)
            .setRememberMe(true);
    }
}
