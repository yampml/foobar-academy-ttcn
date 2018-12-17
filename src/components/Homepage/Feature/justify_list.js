import React from "react";
import Justify_content from "./justify_content";

const CONTENT_STYLE = {
  style:[
  "lnr lnr-book",
  "fa fa-trophy",
  "lnr lnr-screen"
  ], 
};
class Justify_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = CONTENT_STYLE;
  }
  render() {
    return (
      <div className="row justify-content-end">
        <div className="col-lg-4">
        {
          this.state.style.map((item, index) => (
            <Justify_content style= {item} key={index}/>
          ))
        }          
          {}
        </div>
      </div>
    );
  }
}

export default Justify_list;
