package io.github.manishdait.aquila.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import io.github.manishdait.aquila.users.Role;
import io.github.manishdait.aquila.users.User;
import io.github.manishdait.aquila.users.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Component
@Transactional
@Slf4j
public class DefaultUserConfig implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.default.username}")
    private String username;
    @Value("${app.default.password}")
    private String password;
    @Value("${app.default.email}")
    private String email;

    DefaultUserConfig(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    } 

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setEmail(email);
            user.setEnabled(true);
            user.setRole(Role.ADMIN);

            userRepository.save(user);

            log.info("Default Username: " + username + ", Password: " + password);
            log.info("Remenber to change Create new Admin user or to change Password of Admin Account.");
        }
    }
}
