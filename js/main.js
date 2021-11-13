
import appHeader from './cmps/header.cmp.js'
import appFooter from './cmps/footer.cmp.js'
import { router } from '../js/routes.js'
import navModal from './cmps/nav-modal.cmp.js';
const options = {
    el: '#app',
    router,
    template: `
        <section>
            <app-header />
            
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        // navModal 
    }
};

new Vue(options);


/* <user-msg /> */
// long-txt cmp