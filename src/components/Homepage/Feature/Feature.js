import React from "react";
import Justify_list from "./justify_list";

class Feature extends React.Component {
  render() {
    return (
      <section className="feature_area">
        <div className="container">
          <Justify_list />
        </div>
      </section>
    );
  }
}

export default Feature;