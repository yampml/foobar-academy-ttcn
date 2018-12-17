import React from "react";

class Fact_single extends React.Component {
  render() {
    return (
      <div className="col-lg-4 col-md-6">
        <div className="single_fact">
          <div className="f_icon">
            <img src={this.props.icon} alt=""/>
          </div>
          <h4>Expert Mentors</h4>
          <p>
            Bomman
          </p>
        </div>
      </div>
    );
  }
}

export default Fact_single;
