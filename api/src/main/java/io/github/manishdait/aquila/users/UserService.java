package io.github.manishdait.aquila.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.manishdait.aquila.dto.request.UserRequest;
import io.github.manishdait.aquila.dto.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Transactional
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new IllegalStateException("Invalid User"));
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(u -> maprToUserResponse(u)).toList();
    }

    public UserResponse updateUser(UserRequest request) {
        User user = userRepository.findByUsername(request.getName()).orElseThrow();
        user.setEmail(request.getEmail());
        if (request.getRole().equals(Role.USER.name())) {
            user.setRole(Role.USER);
        } else if (request.getRole().equals(Role.ADMIN.name())) {
            user.setRole(Role.ADMIN);
        }

        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());
        }
        
        userRepository.save(user);
        return maprToUserResponse(user);
    }

    private UserResponse maprToUserResponse(User user) {
        return UserResponse.builder()
            .email(user.getEmail())
            .name(user.getUsername())
            .role(user.getRole().name())
            .enabled(user.isEnabled())
            .build();
    }
}
