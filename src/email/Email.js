const sendGridMail = require("@sendgrid/mail");
const track = require("./Track");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {

    constructor() {
        this._to = process.env.EMAIL_TO;
        this._from = null;
        this._subject = null;
        this._html = null;
        this._text = "";
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
        const msg = {
            to: this._to,
            from: this._from,
            subject: this._subject,
            html: this._html
        };
        return sendGridMail.send(msg);
    }
}

module.exports = Email;