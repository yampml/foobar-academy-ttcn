import React from "react";
import BannerInner from "./bannerInner";
import banner_backgound from "../../../assets/img/homepage/banner.jpg";

const bannerStyle = {
  backgroundImage: "url(" + banner_backgound + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
const Banner = () => {
    return (
      <section className="home_banner_area" style ={bannerStyle}>
        <BannerInner />
      </section>
    );
}

export default Banner;
