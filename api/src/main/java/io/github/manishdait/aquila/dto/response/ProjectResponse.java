package io.github.manishdait.aquila.dto.response;

import java.time.Instant;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProjectResponse {
    private Long id;
    private String code;
    private String name;
    private String description;
    private Integer ticketCount;
    private Instant createdAt;
    private List<UserResponse> teamMembers;
}
