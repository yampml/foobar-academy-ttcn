import React from "react";

class Justify_content extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="single_feature d-flex flex-row pb-30">
        <div className="icon">
          <span className={this.props.style} />
        </div>
        <div className="desc">
          <h4>New Classes</h4>
          <p>
            In the history of modern astronomy, there is probably no one greater
            leap forward building and launch.
          </p>
        </div>
      </div>
    );
  }
}

export default Justify_content;
