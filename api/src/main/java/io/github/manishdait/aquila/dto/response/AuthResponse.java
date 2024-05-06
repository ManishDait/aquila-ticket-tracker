package io.github.manishdait.aquila.dto.response;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AuthResponse {
    private String username;
    private String role;
    private String authToken;
    private String refreshToken;
    private Instant createdAt;
    private Instant expireAt;
}
