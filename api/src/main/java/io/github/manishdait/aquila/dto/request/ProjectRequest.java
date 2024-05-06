package io.github.manishdait.aquila.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectRequest {
    private String name;
    private String code;
    private String description;
    private List<String> teamMembers;
}
