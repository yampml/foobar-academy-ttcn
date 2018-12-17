import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// pic for events
// import event1 from '../../../assets/stylesheets/homepage/img/event1.jpg'
// import event2 from '../../../assets/stylesheets/homepage/img/event2.jpg'
// import event3 from '../../../assets/stylesheets/homepage/img/event3.jpg'
// import event4 from '../../../assets/stylesheets/homepage/img/event4.jpg'
// // pic for courses
// import teacher1 from "../../assets/img/homepage/popular_course/course1.jpg"
// import teacher2 from "../../assets/img/homepage/popular_course/course2.jpeg"
// import teacher3 from "../../assets/img/homepage/popular_course/course3.jpg"
// import teacher4 from "../../assets/img/homepage/popular_course/course4.png"
// // pic for department
// import lang_icon from "../../assets/img/homepage/deparment/icon1.png";
// import bussi_icon from "../../assets/img/homepage/deparment/icon2.png"
// import litt_icon from "../../assets/img/homepage/deparment/icon3.png"
// import software_icon from "../../assets/img/homepage/deparment/icon4.png"
// import design_icon from "../../assets/img/homepage/deparment/icon5.png"
// import coach_icon from "../../assets/img/homepage/deparment/icon6.png"
// import dev_icon from "../../assets/img/homepage/deparment/icon7.png"
// ///////////////////////////////////////////////////////////////////////////////////// import img như này là tào lao này
// // fact
// import icon1 from '../../../assets/stylesheets/homepage/img/f-icons/icon1.png'
// import icon2 from '../../../assets/stylesheets/homepage/img/f-icons/icon2.png'
// import icon3 from '../../../assets/stylesheets/homepage/img/f-icons/icon3.png'
// import icon4 from '../../../assets/stylesheets/homepage/img/f-icons/icon4.png'
// import icon5 from '../../../assets/stylesheets/homepage/img/f-icons/icon5.png'
// import icon6 from '../../../assets/stylesheets/homepage/img/f-icons/icon6.png'


const initialState = {
    events: [
    //     {
    //       event_name: "de_cache",
    //       img: event1,
    //       init_day: "Just a long time ago",
    //       description: "Did you see the Communist Party logo overthere?"
    //     },
    //     {
    //       event_name: "de_mirage",
    //       img: event2,
    //       init_day: "Just a shorter time ago",
    //       description: "Tunnel then connector bro!"
    //     },
    //     {
    //       event_name: "de_inferno",
    //       img: event3,
    //       init_day: "Just a momment ago",
    //       description: "Let me teach you how to take Banana alone!"
    //     },
    //     {
    //       event_name: "de_overpass",
    //       img: event4,
    //       init_day: "Just a little bit ago",
    //       description: "Rob the bank"
    //     }
    // ],
    // courses:[
    //     {
    //       course_name: "Full eco rush mid",
    //       single_des: "Let cap the round",
    //       teacher_name: "Bomman",
    //       teacher_pic: teacher1
    //     },
    //     {
    //       course_name: "Họa mi hót",
    //       single_des: "From this point of time, the bird do not sing anymore",
    //       teacher_name: "Mai Nam Hai",
    //       teacher_pic: teacher2
    //     },
    //     {
    //       course_name: "Sinh bắn hay",
    //       single_des: "1v5 clutch 5 sọ",
    //       teacher_name: "Đường Tăng",
    //       teacher_pic: teacher3
    //     },
    //     {
    //       course_name: "Rush B non stop",
    //       single_des: "Phan Đình Đức lấp lỗ B site",
    //       teacher_name: "de_vailon",
    //       teacher_pic: teacher4
    //     }
    //   ],
    // departments: {
    //   depart_lists: [
    //     {
    //       depart_name: "English",
    //       icon: lang_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center mt-100",
    //     },
    //     {
    //       depart_name: "Big data",
    //       icon: bussi_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center",
    //     },
    //     {
    //       depart_name: "Science",
    //       icon: litt_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center mt-100",
    //     },
    //     {
    //       depart_name: "Software",
    //       icon: software_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center",
    //     },
    //     {
    //       depart_name: "Design",
    //       icon: design_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center mt--100",
    //     },
    //     {
    //       depart_name: "Coach",
    //       icon: coach_icon,
    //       depart_style: "col-lg-4 col-md-4 col-sm-6 col-12 text-center",
    //     },
    //     {
    //       depart_name: "Development",
    //       icon: dev_icon,
    //       depart_style: "offset-lg-4 col-lg-4 col-md-4 col-sm-6 col-12 text-center mt--100",
    //     }
    //   ],
    //   depart_description: "Họa mi của bạn đã biết hót chưa?"
    // },
    // facts: {
    //     fact_icon:[
    //         icon1, icon2, icon3, icon4, icon5, icon6
    //     ]
    // }
    ]
}

const updateCourses = (state, action) => {
    return updateObject(state, {
        courses: action.newCoursesInfo
    });
};

const updateDepartments = (state, action) => {
    return updateObject(state, {
        departments: action.newDepartmentsInfo
    });
};

const updateEvents = (state, action) => {
    return updateObject(state, {
        events: action.newEventsInfo
    });
};

const updateFacts = (state, action) => {
    return updateObject(state, {
        facts: action.newFactsInfo
    });
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.HOMEPAGE_UPDATE_COURSES_INFO: return updateCourses(state, action);
        case actionTypes.HOMEPAGE_UPDATE_DEPARTMENTS_INFO: return updateDepartments(state, action);
        case actionTypes.HOMEPAGE_UPDATE_EVENTS_INFO: return updateEvents(state, action);
        case actionTypes.HOMEPAGE_UPDATE_FACTS_INFO: return updateFacts(state, action);
        default:
            return state;
    }
}

export default reducer;