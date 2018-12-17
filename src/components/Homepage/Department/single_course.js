import React from "react";

class Single_course extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className={this.props.depart_style}>
        <div className="single_department">
          <div className="dpmt_icon">
            <img src={this.props.icon} />
          </div>
          <h4>{this.props.depart_name}</h4>
        </div>
      </div>
    );
  }
}

export default Single_course;
