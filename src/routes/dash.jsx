import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Buttons from 'views/Components/Buttons.jsx';
import GridSystem from 'views/Components/GridSystem.jsx';
import Panels from 'views/Components/Panels.jsx';
import SweetAlert from 'views/Components/SweetAlertPage.jsx';
import Notifications from 'views/Components/Notifications.jsx';
import Icons from 'views/Components/Icons.jsx';
import Typography from 'views/Components/Typography.jsx';
import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import ValidationForms from 'views/Forms/ValidationForms.jsx';
import Wizard from 'views/Forms/Wizard/Wizard.jsx';
import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
import VectorMap from 'views/Maps/VectorMap.jsx';
import Charts from 'views/Charts/Charts.jsx';
import Calendar from 'views/Calendar/Calendar.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import Users from 'views/Users/Users.jsx'
import ManageClass from 'views/ManageClass/ManageClass.jsx';
import ManagePopular from 'views/ManagePopular/ManagePopular.jsx';
import ManageEvent from 'views/ManageEvent/ManageEvent.jsx'
import Invoices from '../views/Invoices/Invoices';

import pagesRoutes from './pages.jsx';

var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
  { path: "/admin/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/admin/manageUser", name: "Manage User", icon: "pe-7s-study", component: Users },
    { path: "/admin/manageInvoice", name: "Manage Invoice", icon: "pe-7s-piggy", component: Invoices },
    { path: "/admin/manageClass", name: "Manage Class", icon: "pe-7s-graph", component: ManageClass },
    { path: "/admin/managePopular", name: "Manage Courses", icon: "pe-7s-graph", component: ManagePopular },
    { path: "/admin/manageEvent", name: "Manage Events", icon: "pe-7s-piggy", component: ManageEvent },
    { collapse: true, path: "/admin/components", name: "Components", state: "openComponents", icon: "pe-7s-plugin", views:[
        { path: "/admin/components/buttons", name: "Buttons", mini: "B", component: Buttons },
        { path: "/admin/components/grid-system", name: "Grid System", mini: "GS", component: GridSystem },
        { path: "/admin/components/panels", name: "Panels", mini: "P", component: Panels },
        { path: "/admin/components/sweet-alert", name: "Sweet Alert", mini: "SA", component: SweetAlert },
        { path: "/admin/components/notifications", name: "Notifications", mini: "N", component: Notifications },
        { path: "/admin/components/icons", name: "Icons", mini: "I", component: Icons },
        { path: "/admin/components/typography", name: "Typography", mini: "T", component: Typography }]
    },
    { collapse: true, path: "/admin/forms", name: "Forms", state: "openForms", icon: "pe-7s-note2", views:
        [{ path: "/admin/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms },
        { path: "/admin/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms },
        { path: "/admin/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms },
        { path: "/admin/forms/wizard", name: "Wizard", mini: "W", component: Wizard }]
    },
    { collapse: true, path: "/admin/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
        [{ path: "/admin/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
        { path: "/admin/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
        { path: "/admin/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
    },
    { collapse: true, path: "/admin/maps", name: "Maps", state: "openMaps", icon: "pe-7s-map-marker", views:
        [{ path: "/admin/maps/google-maps", name: "Google Maps", mini: "GM", component: GoogleMaps },
        { path: "/admin/maps/full-screen-maps", name: "Full Screen Map", mini: "FSM", component: FullScreenMap },
        { path: "/admin/maps/vector-maps", name: "Vector Map", mini: "VM", component: VectorMap }]
    },
    { path: "/admin/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
    { path: "/admin/calendar", name: "Calendar", icon: "pe-7s-date", component: Calendar },
    { collapse: true, path: "/pages", name: "Pages", state: "openPages", icon:"pe-7s-gift", views:
        pages
    },
    { redirect: true, path: "/", pathTo: "/admin/dashboard", name: "Dashboard" }
];
export default dashRoutes;
