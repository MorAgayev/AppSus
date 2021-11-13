export default {
    props: ['unreadEmails'],
    name: 'email-filter',
    template: `
        <section class="email-filter">
                <ul v-show="!mobile" class="filter-container">
                    <li class="addEmailLi" @click="openNewEmail()"><span class="fa fa-plus"></span> New Email</li>
                    <div class="filter-option">
                        <li @click="setFilter('inbox')"><span class="fa fa-inbox"></span> Inbox <span>{{unreadEmails}}</span></li>
                        <li @click="setFilter('sent')"><span class="fa fa-share-square"></span> Sent</li>
                        <li @click="setFilter('trash')"> <span class="fa fa-trash"></span> Trash</li>
                        <li @click="setFilter('draft')"><span class="fa fa-copy"></span> Draft</li>
                    </div>
                </ul>
                <div v-show="mobile" class="menu-icon-container">
                    <i @click="toggleMenu" class="fa fa-bars" :class="{'icon-active': mobileNav}"></i>
                </div>
                <transition name="mobile-nav">
                <ul v-show="mobileNav" class="filter-container">
                    <li class="addEmailLi" @click="openNewEmail()"><span class="fa fa-plus"></span> New Email</li>
                    <div class="filter-option">
                        <li @click="setFilter('inbox')"><span class="fa fa-inbox"></span> Inbox <span>{{unreadEmails}}</span></li>
                        <li @click="setFilter('sent')"><span class="fa fa-share-square"></span> Sent</li>
                        <li @click="setFilter('trash')"> <span class="fa fa-trash"></span> Trash</li>
                        <li @click="setFilter('draft')"><span class="fa fa-copy"></span> Draft</li>
                    </div>
                </ul>
                </transition>
        </section>
    `,
    data() {
        return {
            mobile: null, 
            scrollPosition: null, 
            mobileNav: null,
            windowWidth: null
        }
    },
    mounted() {

    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen()
    }, 

    methods: {
        setFilter(val) {
            this.$emit('filterd', val)
            this.toggleMenu()
        }, 

        openNewEmail() {
            this.$emit('OpenNewEmail')
            this.toggleMenu()
        }, 

        toggleMenu() {
            this.mobileNav = !this.mobileNav
        },

        checkScreen() {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 750) {
                this.mobile = true;
                return
            }
            this.mobile = false;
            this.mobileNav = false
        }
    }, 
    computed: {
        // setMenu() {
        //     if(this.filterStyle.isOpen) return 'menu-open'
        //     else return 'menu-close'
        // }
    }
}