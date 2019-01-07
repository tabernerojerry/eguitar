const mailer = require("nodemailer");

const welcome = require("./welcome_template");
const purchase = require("./purchase_template");
const resetPassword = require("./resetpassword_template");

const getEmailData = (to, name, token, template, actionData) => {
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
    case "purchase":
      data = {
        from: "EWaves <yellowflash717@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData)
      };
      break;
    case "reset_password":
      data = {
        from: "EWaves <yellowflash717@gmail.com>",
        to,
        subject: `Hey ${name}, reset your password`,
        html: resetPassword(actionData)
      };
      break;
    default:
      data;
  }

  return data;
};

const sendMail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

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
