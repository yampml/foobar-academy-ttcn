import React from "react";
import Popular_single_course from "./popular_single_course";
import teacher_boom from "../../../assets/img/homepage/popular_course/course1.jpg"

class List_popular_course extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        {}
        {
          this.props.courses.map((item, index) => (
            <Popular_single_course course_name = {item.course_name}
                    single_des = {item.single_des}
                    teacher_name = {item.teacher_name}
                    teacher_pic = {item.teacher_pic}
                    key = {index}
            />
          ))
          }     
        {}
      </div>
    );
  }
}

export default List_popular_course;
