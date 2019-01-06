import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onSuccess(payment);

      //console.log(JSON.stringify(payment));
      /*
      {
        "paid":true,
        "cancelled":false,
        "payerID":"EGDNPKJYL9XUJ",
        "paymentID":"PAY-4GW41141YK885603JLQW7INI",
        "paymentToken":"EC-5J495725XE318241C",
        "returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-4GW41141YK885603JLQW7INI&token=EC-5J495725XE318241C&PayerID=EGDNPKJYL9XUJ",
        "address":{
          "recipient_name":"test buyer",
          "line1":"Level 01, No 1, First Avenue Bandar Utama",
          "city":"Petaling Jaya",
          "state":"Selangor",
          "postal_code":"47800",
          "country_code":"MY"
        },
        "email":"mtabernerojerry-buyer@gmail.com"
      }
      */
    };
    const onCancel = data => {
      console.log(JSON.stringify(data));
    };
    const onError = error => {
      console.log(JSON.stringify(error));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AXIwL_UCBHk6x4jOkqALe75E6W9g1zaVW0PV6NVyLhZEJZyT20F-SyS4G5Eb4S6QsiTpnlDJSLllaQoM",
      production: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          currency={currency}
          total={total}
          client={client}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
          style={{ size: "large", color: "blue", shape: "rect" }}
        />
      </div>
    );
  }
}

export default Paypal;
