import Pages from 'containers/Pages/Pages.jsx';
import Dash from 'containers/Dash/Dash.jsx';

var appRoutes = [
    { path: "/pages/login-page", name: "Pages", component: Pages },
    { path: "/pages/register-page", name: "Pages", component: Pages },
    { path: "/pages/lock-screen-page", name: "Pages", component: Pages },

    { redirect: true, path: "/pages/", to: "/dashboard" }, //bat buoc phai dung truoc cai duoi (code sida)
    { path: "/", name: "Home", component: Dash },
];

export default appRoutes;
