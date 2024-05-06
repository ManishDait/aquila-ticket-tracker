package io.github.manishdait.aquila.project;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.manishdait.aquila.auth.AuthService;
import io.github.manishdait.aquila.dto.request.ProjectRequest;
import io.github.manishdait.aquila.dto.response.ProjectResponse;
import io.github.manishdait.aquila.dto.response.UserResponse;
import io.github.manishdait.aquila.ticket.TicketRepository;
import io.github.manishdait.aquila.users.User;
import io.github.manishdait.aquila.users.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    private final AuthService authService;

    public ProjectResponse createProject(ProjectRequest request) {
        User user = authService.getCurrentUser();
        request.getTeamMembers().add(user.getUsername());
        
        Project project = Project.builder().name(request.getName())
            .description(request.getDescription())
            .createdAt(Instant.now())
            .teamMembers(
                request.getTeamMembers()
                    .stream()
                    .map(u -> mapToUser(u))
                    .collect(Collectors.toList())
            )
            .code(request.getCode())
            .build();

        Project response = projectRepository.save(project);
        return mapToProjectResponse(response);
    }

    public List<ProjectResponse> getProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects
            .stream()
            .map(p -> mapToProjectResponse(p))
            .collect(Collectors.toList());
    }

    public ProjectResponse getProject(Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        return mapToProjectResponse(project);
    }

    public ProjectResponse getProjectByCode(String code) {
        Project project = projectRepository.findByCode(code).orElseThrow();
        return mapToProjectResponse(project);
    }

    public List<ProjectResponse> getProjectByUsername(String username) {
        User user = mapToUser(username);
        List<Project> projects = projectRepository
            .findByTeamMembersContainingIgnoreCase(user)
            .orElseThrow(() -> new IllegalStateException("Invalid username"));
            
        return projects
            .stream()
            .map(p -> mapToProjectResponse(p))
            .collect(Collectors.toList());
    }

    public ProjectResponse updateProject(ProjectResponse request) {
        Project project = projectRepository.findById(request.getId()).orElseThrow();
        project.setDescription(request.getDescription());
        project.setName(request.getName());
        project.setCode(request.getCode());
        project.setTeamMembers(
            request.getTeamMembers()
                .stream()
                .map(u -> mapToUser(u.getName()))
                .collect(Collectors.toList())
        );
        projectRepository.save(project);

        return mapToProjectResponse(project);
    }

    private ProjectResponse mapToProjectResponse(Project project) {
        return ProjectResponse.builder()
            .id(project.getId())
            .name(project.getName())
            .description(project.getDescription())
            .ticketCount(ticketRepository.findByProject(project).get().size())
            .teamMembers(
                project.getTeamMembers().stream()
                .map(
                    u -> new UserResponse(u.getUsername(), u.getEmail(), u.getRole().name(), u.isEnabled())
                )
                .collect(Collectors.toList())
            )
            .code(project.getCode())
            .createdAt(project.getCreatedAt())
            .build();
    }

    private User mapToUser(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }
}
