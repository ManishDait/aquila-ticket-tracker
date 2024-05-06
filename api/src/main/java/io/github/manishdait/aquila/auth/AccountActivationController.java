package io.github.manishdait.aquila.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
@RequestMapping("/aquila-api/activate")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AccountActivationController {
    private final AuthService authService;

    @GetMapping("account/{token}")
    public String getMethodName(@PathVariable String token) {
        authService.activateAccount(token);
        return "accountActivation";
    }
}
