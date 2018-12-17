import React from "react";

class FooterWidgetNew extends React.Component {
  render() {
    return (
      <div className="col-lg-4 col-md-6 single-footer-widget">
        <h4>FaceIt</h4>
        <p>Road to level 10 FaceIt</p>
        <div className="form-wrap" id="mc_embed_signup">
          <form
            target="_blank"
            action="#"
            method="get"
            className="form-inline"
          >
            <input
              className="form-control"
              name="EMAIL"
              placeholder="Your Email Address"
              // onFocus="this.placeholder = ''"
              // onBlur="this.placeholder = 'Your Email Address'"
              required
              type="email"
            />
            <button className="click-btn btn btn-default">
              <span>subscribe</span>
            </button>
            <div
              style={{
                position: "absolute",
                left: "-5000px"
              }}
            >
              <input
                name="b_36c4fd991d266f23781ded980_aefe40901a"
                tabIndex={-1}
                defaultValue
                type="text"
              />
            </div>
            <div className="info" />
          </form>
        </div>
      </div>
    );
  }
}

export default FooterWidgetNew;
