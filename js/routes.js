import homePage from "./pages/home-page.cmp.js";
import emailApp from "./apps/email/pages/email-app.cmp.js";
import keepApp from "./apps/keep/pages/keep-app.cmp.js";
const routes = [
    {
        path: '/', 
        component: homePage
    },
    {
        path: '/email', 
        component: emailApp,
    },
    {
        path: '/keep', 
        component: keepApp
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // }

]

export const router = new VueRouter({ routes });