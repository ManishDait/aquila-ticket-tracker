package io.github.manishdait.aquila.dto.response;

import java.time.Instant;
import java.util.List;

import io.github.manishdait.aquila.ticket.Priority;
import io.github.manishdait.aquila.ticket.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketResponse {
    private Long id;
    private String title;
    private String description;
    private Instant createdAt;
    private Instant updatedAt;
    private Priority priority;
    private Status status;
    private UserResponse reportedBy;
    private List<UserResponse> assignees;
    private Long projectId;
    private String projectCode;
    private Integer commentCount;
}
