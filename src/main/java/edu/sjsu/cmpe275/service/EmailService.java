package edu.sjsu.cmpe275.service;

import edu.sjsu.cmpe275.config.AppConfig;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Email service to send email's via gmail smtp server
 * Reference: https://mkyong.com/java/javamail-api-sending-email-via-gmail-smtp-example/
 */
@Service
@Slf4j
public class EmailService {

    private Session session;

    @Autowired
    private AppConfig appConfig;

    public boolean sendEmail(@NonNull String emailId,
                             @NonNull String name,
                             @NonNull String emailVerificationCode) {

        try {

            // If a test email is set up in the application properties, send email to that instead all the time.
            if (appConfig.getEmail() != null && StringUtils.hasText(appConfig.getEmail().getTestEmail())) {
                emailId = appConfig.getEmail().getTestEmail();
            }

            Message message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(appConfig.getEmail().getUsername()));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(emailId)
            );
            message.setSubject("DirectExchange - Please Verify Your Email!");
            message.setText(
                    String.format("Dear %s,"
                                    + "\n\n Please verify your email by pasting this code"
                                    + "\n\n Code: %s",
                            name, emailVerificationCode)
//                    String.format("Dear %s,"
//                                    + "\n\n Please verify your email by clicking on this link"
//                                    + "\n\n %s/auth/verify?code=%s",
//                            name, appConfig.getBaseUrl(), emailVerificationCode)
            );

            Transport.send(message);
            log.info("Successfully send email to {}", emailId);
            return true;

        } catch (MessagingException e) {
            log.error("Unable to send email for email {}", emailId, e);
            return false;
        }
    }

    @Synchronized
    private Session getSession() {
        if (session == null) {
            Properties prop = new Properties();
            prop.put("mail.smtp.host", "smtp.gmail.com");
            prop.put("mail.smtp.port", "465");
            prop.put("mail.smtp.auth", "true");
            prop.put("mail.smtp.socketFactory.port", "465");
            prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

            this.session = Session.getInstance(prop,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(
                                    appConfig.getEmail().getUsername(),
                                    appConfig.getEmail().getPassword());
                        }
                    });
        }
        return session;
    }



    public boolean sendCounterOfferEmail(@NonNull String senderName, @NonNull String emailId, @NonNull String receiverName, @NonNull String srcCurrency, @NonNull Float remitAmount) {

        try {

            // If a test email is set up in the application properties, send email to that instead all the time.
            if (appConfig.getEmail() != null && StringUtils.hasText(appConfig.getEmail().getTestEmail())) {
                emailId = appConfig.getEmail().getTestEmail();
            }

            Message message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(appConfig.getEmail().getUsername()));
            message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse(emailId)
            );
            message.setSubject("DirectExchange - New Counter Offer!");
            message.setText(
                String.format("Dear %s,"
                        + "\n\n %s has sent you a new counter offer for your initial offer - %s %3.14f"
                        + "\n\n Please login to view more details.",
                    receiverName, senderName, srcCurrency, remitAmount)
            );

            Transport.send(message);
            log.info("Successfully send email to {}", emailId);
            return true;

        } catch (MessagingException e) {
            log.error("Unable to send email for email {}", emailId, e);
            return false;
        }
    }
}
