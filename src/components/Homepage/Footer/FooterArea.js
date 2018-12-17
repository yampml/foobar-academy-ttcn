import React from "react";
import FooterWidget from "./FooterWidget";
import FooterSocial from "./FooterSocial";

class FooterArea extends React.Component {
  render() {
    return (
      <footer className="footer-area section_gap">
        <div className="container">
          <FooterWidget />
          <FooterSocial />
        </div>
      </footer>
    );
  }
}

export default FooterArea;
