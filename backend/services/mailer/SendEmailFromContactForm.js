class SendEmailFromContactForm {
  constructor(transporter, config) {
    this.transporter = transporter;
    this.config = config;
  }

  async handle(emailData) {
    const { email: SMTPEmail, app } = this.config;

    const { firstAndLastName, email, topic, phone, message } = emailData;

    await this.transporter.sendMail({
      from: SMTPEmail.auth.user,
      to: "mateuszrozkosz97@wp.pl",
      replyTo: email,
      subject: `${topic}`,
      text: "",
      html: `${message}
            <br>
            --
            <br>
            ${phone},<br>
            ${firstAndLastName},`,
    });
  }
}

module.exports = SendEmailFromContactForm;
