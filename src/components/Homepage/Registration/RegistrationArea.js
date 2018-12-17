import React from "react";
import RegistrationClock from "./RegistrationClock";
import RegistrationForm from "./RegistrationForm";

class RegistrationArea extends React.Component {
  render() {
    return (
      <div className="section_gap registration_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <RegistrationClock />
            </div>
            <div className="col-lg-4 offset-lg-1">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationArea;
