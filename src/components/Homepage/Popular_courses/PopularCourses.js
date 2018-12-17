import React from "react";
import List_popular_course from "./list_popular_course";

class PopularCourses extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="popular_courses lite_bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="main_title">
                <h2>Popular Courses</h2>
                <p>
                  Once the nade has been thrown
                </p>
              </div>
            </div>
          </div>
          <List_popular_course courses = {this.props.courses}  />
        </div>
      </div>
    );
  }
}

export default PopularCourses;