import React from "react";

class RegistrationForm extends React.Component {
  render() {
    return (
      <div className="register_form">
        <h3>Just P90</h3>
        <p>Road to Global Elite</p>
        <form
          className="form_area"
          id="myForm"
          action="mail.html"
          method="post"
        >
          <div className="row">
            <div className="col-lg-12 form_group">
              <input name="name" placeholder="Your Name" required type="text" />
              <input
                name="name"
                placeholder="Your Phone Number"
                required
                type="tel"
              />
              <input
                name="email"
                placeholder="Your Email Address"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$"
                required
                type="email"
              />
            </div>
            <div className="col-lg-12 text-center">
              <button className="primary-btn">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
