import React from "react";

class Banner_search_form extends React.Component {
  render() {
    return (
       //action
      <form className="form_box d-flex justify-content-between w-100">
        <input
          type="text"
          placeholder="Search Courses"
          className="form-control"
          name="username"
          // onfocus="this.placeholder = ''"
          // onblur="this.placeholder = 'Search Courses'"
        />
        <button type="submit" className="btn search_course_btn">
          Search
        </button>
      </form>
    );
  }
}

export default Banner_search_form;
