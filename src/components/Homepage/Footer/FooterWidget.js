import React from "react";
import FooterWidgetLink from "./FooterWidgetLink";
import FooterWidgetNew from "./FooterWidgetNew";

const COMPETITIVE = {
  competitive:[
    "Top maps",
    "Tricks in map",
    "How to get high",
    "Drunk man"
  ]
}
class FooterWidget extends React.Component {
  constructor(props){
    super(props);
    this.state = COMPETITIVE
  }
  render() {
    return (
      <div className="row">
        {
          this.state.competitive.map((item, index) => (
            <FooterWidgetLink competitive ={item} key={index} /> 
          ))
        }   
        <FooterWidgetNew />
      </div>
    );
  }
}

export default FooterWidget;
