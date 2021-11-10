import homePage from "./pages/home-page.cmp.js";
import emailApp from "./apps/email/pages/email-app.cmp.js";
import noteApp from "./apps/note/pages/note-app.cmp.js";

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
        path: '/note',
        component: noteApp
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // }

]

export const router = new VueRouter({ routes });