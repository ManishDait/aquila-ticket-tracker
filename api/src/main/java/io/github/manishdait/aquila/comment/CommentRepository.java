package io.github.manishdait.aquila.comment;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.manishdait.aquila.ticket.Ticket;
import io.github.manishdait.aquila.users.User;

@Repository
public interface CommentRepository extends JpaRepository <Comment, Long> {
    Optional<List<Comment>> findByTicket(Ticket ticket);
    Optional<List<Comment>> findByCreatedBy(User user);
}
