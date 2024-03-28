import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
const API_KEY = 'mlsn.c56ebd7d6f2e4b83efc308dc6773482f9bfd78f09f23c6525a19d446b0bbeee9'
const mailerSend = new MailerSend({
  apiKey: API_KEY,
});

const sentFrom = new Sender("you@yourdomain.com", "Your name");

const recipients = [
  new Recipient("your@client.com", "Your Client")
];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content");

await mailerSend.email.send(emailParams);
