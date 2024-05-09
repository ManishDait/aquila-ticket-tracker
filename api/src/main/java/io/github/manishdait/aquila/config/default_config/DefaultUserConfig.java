package io.github.manishdait.aquila.config.default_config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import io.github.manishdait.aquila.users.Role;
import io.github.manishdait.aquila.users.User;
import io.github.manishdait.aquila.users.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Transactional
@Slf4j
public class DefaultUserConfig implements ApplicationRunner {
    private final UserRepository userRepository;
    private final ConfigRepository configRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (configRepository.count() == 0) {
            User user = new User();
            user.setUsername("Admin");
            user.setPassword(passwordEncoder.encode("P@ssw0rd"));
            user.setEmail("admin101@aquila.demo");
            user.setEnabled(true);
            user.setRole(Role.ADMIN);
        
            userRepository.save(user);

            Config config = new Config();
            config.setInitialize(true);
            configRepository.save(config);

            log.info("Default Username: " + user.getUsername() + ", Password: P@ssw0rd");
        }
        
    }
}
