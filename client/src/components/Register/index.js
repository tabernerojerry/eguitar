import React from "react";

import Button from "../utils/Button";
import Login from "./Login";

const Register = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              sint velit alias aliquid illo ipsum odio sed inventore dolor
              saepe, delectus sunt, autem aperiam ab nemo beatae minima fugit
              porro.
            </p>
            <Button
              type="default"
              title="Create An Account"
              linkTo="/register"
              addStyles={{
                margins: "10px 0 0 0"
              }}
            />
          </div>
          <div className="right">
            <h2>Registere Customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
