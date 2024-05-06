package io.github.manishdait.aquila.dto.request;

import java.util.List;

import io.github.manishdait.aquila.ticket.Priority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TicketRequest {
    private String title;
    private String description;
    private Priority priority;
    private List<String> assignees;
    private Long projectId;
}
