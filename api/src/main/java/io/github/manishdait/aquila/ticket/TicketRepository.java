package io.github.manishdait.aquila.ticket;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.manishdait.aquila.project.Project;
import io.github.manishdait.aquila.users.User;

@Repository
public interface TicketRepository extends JpaRepository <Ticket, Long> {
    Optional<List<Ticket>> findByReportedBy(User user);
    Optional<List<Ticket>> findByProject(Project project);
    Optional<List<Ticket>> findByAssigneesContainingIgnoreCase(User user);
}
