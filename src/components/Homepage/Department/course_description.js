import React from "react";

class Course_description extends React.Component {
  render() {
    return (
      <div className="offset-lg-1 col-lg-5">
        <div className="dpmt_right">
          <h1>{this.props.depart_description}</h1>
          <p>
            There is a moment in the life of any aspiring astronomer that it is
            time to buy that first telescope. It’s exciting to think about
            setting up your own viewing station. In the life of any aspiring
            astronomer that it is time to buy that first telescope. It’s
            exciting to think about setting up your own viewing station.
          </p>
          <p>
            It’s exciting to think about setting up your own viewing station. In
            the life of any aspiring astronomer that it is time to buy that
            first telescope exciting is time to buy that first.
          </p>
          <a href="#" className="primary-btn text-uppercase">
            Explore Courses
          </a>
        </div>
      </div>
    );
  }
}

export default Course_description;
