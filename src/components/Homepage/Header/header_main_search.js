import React from "react";

class header_main_search extends React.Component {
  render() {
    return (
      <div className="search_input" id="search_input_box">
        <div className="container">
          <form className="d-flex justify-content-between">{/*  // method action */}
            <input
              type="text"
              className="form-control"
              id="search_input"
              placeholder="Search Here"
            />
            <button type="submit" className="btn" />
            <span
              className="lnr lnr-cross"
              id="close_search"
              title="Close Search"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default header_main_search;
