const mailer = require("nodemailer");

const welcome = require("./welcome_template");

const getEmailData = (to, name, token, template) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: "EWaves <yellowflash717@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome()
      };
      break;
    default:
      data;
  }

  return data;
};

const sendMail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type);

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
    smtpTransport.close();
  });
};

module.exports = sendMail;
