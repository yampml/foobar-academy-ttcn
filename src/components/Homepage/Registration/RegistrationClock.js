import React from "react";

class RegistrationClock extends React.Component {
  render() {
    return (
      <div className="row clock_sec clockdiv" id="clockdiv">
        <div className="col-lg-12">
          <h1>Rush Now</h1>
          <p>
            Wanna rush B in Cache, Dust 2, Mirage? Go!
          </p>
        </div>
        <div className="col clockinner1 clockinner">
          <h1 className="days">150</h1>
          <span className="smalltext">Days</span>
        </div>
        <div className="col clockinner clockinner1">
          <h1 className="hours">23</h1>
          <span className="smalltext">Hours</span>
        </div>
        <div className="col clockinner clockinner1">
          <h1 className="minutes">47</h1>
          <span className="smalltext">Mins</span>
        </div>
        <div className="col clockinner clockinner1">
          <h1 className="seconds">59</h1>
          <span className="smalltext">Secs</span>
        </div>
      </div>
    );
  }
}

export default RegistrationClock;
