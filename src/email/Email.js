const sendGridMail = require("@sendgrid/mail");
const track = require("./Track");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {

    constructor() {
        this._to = process.env.EMAIL_TO;
        this._from = null;
        this._subject = null;
        this._html = null;
    }

    withFrom(from) {
        this._from = from;
        return this;
    }

    withSubject(subject) {
        this._subject = subject;
        return this;
    }

    withHtml(html) {
        this._html = html;
        return this;
    }

    send() {
        return sendGridMail.send({
            to: this._to,
            from: this._from,
            subject: this._subject,
            html: this._html
        });
    }
}

let body = "<strong>Test service sendgrid trigger email</strong><a href=\"http://youtube.com.br\">link<a>";
body = track.addLinkClickedLinkEmail(body, 1, 1);
body = track.addLinkOpenedEmail(body, 1, 1);
console.log(body);
new Email()
    .withFrom("tiagorosadacost@gmail.com")
    .withSubject("Test service sendgrid trigger email")
    .withHtml(body)
    .send()
    .then(() => console.log("Send email success!"));

// module.exports = Email;