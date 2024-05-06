package io.github.manishdait.aquila.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NotificationEmail {
    private String recipient;
    private String subject;
    private String body;
}
