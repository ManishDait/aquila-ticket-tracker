package io.github.manishdait.aquila.dto.response;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentResponse {
    private Long id;
    private String context;
    private String createdBy;
    private Long ticketId;
    private Instant createdAt;
}
