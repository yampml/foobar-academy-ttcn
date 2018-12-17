import React from "react";
import Single_course from "./single_course";

class Courses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dpmt_courses">
        <div className="row">
          {}
          {
            this.props.depart_lists.map((item, index) => (
              <Single_course depart_style = {item.depart_style}
                  depart_name = {item.depart_name}
                  icon = {item.icon}
                  key = {index} 
              />
            ))
          }
          {}
        </div>
      </div>
    );
  }
}

export default Courses;
