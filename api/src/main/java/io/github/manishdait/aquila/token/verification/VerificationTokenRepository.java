package io.github.manishdait.aquila.token.verification;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository <VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
} 
