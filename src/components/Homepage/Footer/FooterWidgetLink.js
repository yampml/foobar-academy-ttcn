import React from "react";
import { Link } from 'react-router-dom'
const MAP_NAME = {
  name :[
    "de_cache",
    "de_dust2",
    "de_mirage",
    "de_overpass",
    "de_vailon"
  ]
}
class FooterWidgetLink extends React.Component {
  constructor(props){
    super(props);
    this.state = MAP_NAME
  }
  render() {
    return (
      <div className="col-lg-2 col-md-6 single-footer-widget">
        <h4>{this.props.competitive}</h4>
        <ul>
        {
          this.state.name.map((item, index) => (
            <li key={index}><Link to="/#" >{item}</Link></li>
          ))
        }   
        </ul>
      </div>
    );
  }
}

export default FooterWidgetLink;
