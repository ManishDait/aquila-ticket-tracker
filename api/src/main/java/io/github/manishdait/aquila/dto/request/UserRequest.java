package io.github.manishdait.aquila.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequest {
    private String name;
    private String email;
    private String role;
    private String password;
    private boolean enabled;
}
