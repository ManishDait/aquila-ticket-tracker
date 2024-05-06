package io.github.manishdait.aquila.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RefereshTokenRequest {
    private String refreshToken;
    private String username;
}
