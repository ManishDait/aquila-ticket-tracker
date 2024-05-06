package io.github.manishdait.aquila.mail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final MailContextBuilder mailContextBuilder;

    @Async
    public void sendMail(NotificationEmail notificationEmail) {
        MimeMessagePreparator messagePreparator = message -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message);
            messageHelper.addTo(notificationEmail.getRecipient());
            messageHelper.setFrom("aquila.co.in");
            messageHelper.setSubject(notificationEmail.getSubject());
            messageHelper.setText(mailContextBuilder.build(notificationEmail.getBody()));
        };

        try {
            mailSender.send(messagePreparator);
        } catch (Exception e) {
            log.error("Unable to send Email: {}", e);
        }
    }
}

@Service
@AllArgsConstructor
class MailContextBuilder {
    private final TemplateEngine templateEngine;

    public String build(String message) {
        Context context = new Context();
        context.setVariable("message", message);

        return templateEngine.process("mailTemplate", context).toString();
    }
}
