import React from "react";
import { Link } from "react-router-dom"
class Popular_single_course extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-lg-3 col-md-6">
        <div className="single_course">
          <div className="course_head overlay">
            <img
              className="img-fluid w-100"
              src={this.props.teacher_pic} 
              width={"30"} height={"30"}
            />
            <div className="authr_meta">
              <img src={this.props.teacher_pic} width={"30"} height={"30"} />
              <span>{this.props.teacher_name}</span>
            </div>
          </div>
          <div className="course_content">
            <h4>
              <Link to="#">{this.props.course_name}</Link>
            </h4>
            <p>
              {this.props.single_des}
            </p>
            <div className="course_meta d-flex justify-content-between">
              <div>
                <span className="meta_info">
                  <Link to="#">
                    <i className="lnr lnr-user" />
                    355
                  </Link>
                </span>
                <span className="meta_info">
                  <Link to="#">
                    <i className="lnr lnr-bubble" />
                    35
                  </Link>
                </span>
              </div>
              <div>
                <span className="price">$150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popular_single_course;
