package io.github.manishdait.aquila.config.default_config;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends JpaRepository <Config, Long> {
    
}
