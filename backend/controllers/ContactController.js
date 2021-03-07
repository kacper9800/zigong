const HttpStatuses = require("http-status-codes");

class ContactController {
  constructor(sendEmailFromContactFormHandler) {
    this.sendEmailFromContactFormHandler = sendEmailFromContactFormHandler;
  }

  async sendEmail(req, res) {
    const { firstAndLastName, email, topic, phone, message } = req.body;
    const emailData = {
      firstAndLastName,
      email,
      topic,
      phone,
      message,
    };

    await this.sendEmailFromContactFormHandler.handle(emailData);

    res.sendStatus(HttpStatuses.OK);
  }
}

module.exports = ContactController;
