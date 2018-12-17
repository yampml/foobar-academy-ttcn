import React, { Component } from 'react';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';
import Department from './Department/Department';
import PopularCourses from './Popular_courses/PopularCourses';
import FactArea from './Fact_area/FactArea';
import RegistrationArea from './Registration/RegistrationArea'
import EventArea from './Event/EventArea'
import FooterArea from './Footer/FooterArea'

import { connect } from 'react-redux';

// import '../../assets/css/homepage/css/bootstrap';
// import '../../assets/css/homepage/css/font-awesome.min';
// import '../../assets/css/homepage/css/style.css';
// import '../../assets/css/homepage/lightbox/simpleLightbox.css';
// import '../../assets/css/homepage/nice-select/css/nice-select.css';
// import '../../assets/css/homepage/owl-carousel/owl.carousel.min.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <Banner />
                <Feature />
                <Department depart_lists = {this.props.departments.depart_lists}
                        depart_description = {this.props.departments.depart_description}
                />
                <PopularCourses courses = {this.props.courses}      
                />
                <FactArea fact_icon = {this.props.facts.fact_icon}/>
                <RegistrationArea />
                <EventArea events = {this.props.events} />
                <FooterArea />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.homepage.events,
        departments: state.homepage.departments,
        courses: state.homepage.courses,
        facts: state.homepage.facts
    }
}

export default connect(mapStateToProps, null)(Homepage);