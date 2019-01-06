import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCompass from "@fortawesome/fontawesome-free-solid/faCompass";
import faPhone from "@fortawesome/fontawesome-free-solid/faPhone";
import faClock from "@fortawesome/fontawesome-free-solid/faClock";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";

const Footer = ({ data }) => (
  <footer className="bck_b_dark">
    <div className="container">
      <div className="logo">WAVES</div>
      <div className="wrapper">
        <div className="left">
          <h2>Contact Information</h2>
          <div className="business_nfo">
            <div className="tag">
              <FontAwesomeIcon icon={faCompass} className="icon" />
              <div className="nfo">
                <div>Address</div>
                <div>{data.siteData && data.siteData[0].address}</div>
              </div>
            </div>
            <div className="tag">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <div className="nfo">
                <div>Phone</div>
                <div>{data.siteData && data.siteData[0].phone}</div>
              </div>
            </div>
            <div className="tag">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <div className="nfo">
                <div>Working Hours</div>
                <div>{data.siteData && data.siteData[0].hours}</div>
              </div>
            </div>
            <div className="tag">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <div className="nfo">
                <div>Email</div>
                <div>{data.siteData && data.siteData[0].email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="left">
          <h2>Be the first to know</h2>
          <div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae ad, sint perspiciatis doloremque odit, ipsa laboriosam
              qui provident consectetur cumque hic. Iusto quas perspiciatis
              accusamus fuga. Animi quo obcaecati placeat?
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
