package io.github.manishdait.aquila;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AquilaApplication {
	public static void main(String[] args) {
		SpringApplication.run(AquilaApplication.class, args);
	}
}
