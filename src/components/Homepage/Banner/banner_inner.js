import React from "react";
import Banner_search_form from "./banner_search_form";

class Banner_inner extends React.Component {
  render() {
    return (
      <div className="banner_inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner_content">
                <h2>
                  Full eco <br />
                  Rush Mid
                </h2>
                <p>
                  In the history of modern astronomy, there is probably no one
                  greater leap forward than the building and launch of the space
                  telescope known as the Hubble.
                </p>
                <div className="search_course_wrap">
                  <Banner_search_form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner_inner;
