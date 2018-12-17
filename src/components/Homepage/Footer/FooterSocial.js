import React from "react";
import { Link } from 'react-router-dom'

const SOCIAL_LINK = {
  social: [
    "fa fa-facebook",
    "fa fa-twitter",
    "fa fa-dribbble",
    "fa fa-behance"
  ]
}
class FooterSocial extends React.Component {
  constructor(props) {
    super(props);
    this.state = SOCIAL_LINK
  }
  render() {
    return (
      <div className="row footer-bottom d-flex justify-content-between">
        <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
          Copyright © AN HIU XINH | This application is made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
          <Link to ="https://www.youtube.com/user/bomman10">watching Bomman</Link>
        </p>
        <div className="col-lg-4 col-sm-12 footer-social">
        {
          this.state.social.map((item, index) => (
            <Link to="/#" key={index}><i className={item} /></Link> 
          ))
        } 
        </div>
      </div>
    );
  }
}

export default FooterSocial;
