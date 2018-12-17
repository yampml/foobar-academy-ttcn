import React from "react";
import Banner_inner from "./banner_inner";
import banner_backgound from "../../../assets/img/homepage/banner.jpg";

const bannerStyle = {
  backgroundImage: "url(" + banner_backgound + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
const Banner = () => {
    return (
      <section className="home_banner_area" style ={bannerStyle}>
        <Banner_inner />
      </section>
    );
}

export default Banner;
