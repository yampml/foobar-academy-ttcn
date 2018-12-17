import React from "react";
import Header_main_search from "./header_main_search";
import Header_main_nav from "./header_main_nav";

class header_main extends React.Component {
  render() {
    return (
      <div className="main_menu">
        <Header_main_search />
        <Header_main_nav />
      </div>
    );
  }
}

export default header_main;
