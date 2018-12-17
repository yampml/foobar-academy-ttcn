import React from "react";
import {Link} from "react-router-dom";

class SingleEvent extends React.Component {
  render() {
    return (
      <div className="col-lg-6">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className="single_event">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-5">
                  <div className="event_thumb">
                    <img src={this.props.image} alt ="" width={"400"} height={"200"} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-7">
                  <div className="event_details">
                    <p>{this.props.init_day}</p>
                    <h4>
                      <Link to="#">{this.props.name}</Link>
                    </h4>
                    <p>
                      {this.props.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleEvent;
