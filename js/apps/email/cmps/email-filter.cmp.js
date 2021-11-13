// import {
//     emailService
// } from "../service/email.service.js"
export default {
    props: ['unreadEmails'],
    name: 'email-filter',
    template: `
        <section class="email-filter" >
            <button @click="toggleMenu">=</button>
            <ul :class="setMenu">
                <li @click="openNewEmail()">New Email</li>
                <li @click="setFilter('inbox')">inbox <span>{{unreadEmails}}</span></li>
                <li @click="setFilter('sent')">sent</li>
                <li @click="setFilter('trash')">trash</li>
                <li @click="setFilter('draft')">draft</li>
            </ul>
        </section>
    `,
    data() {
        return {
            filterStyle: {
                isOpen: false
            }
        }
    },
    mounted() {

    },
    methods: {
        setFilter(val) {
            this.$emit('filterd', val)
        }, 

        openNewEmail() {
            this.$emit('OpenNewEmail')
        }, 

        toggleMenu() {
            this.filterStyle.isOpen = !this.filterStyle.isOpen
            console.log('is open ', this.filterStyle.isOpen);
        }
    }, 
    computed: {
        setMenu() {
            if(this.filterStyle.isOpen) return 'menu-open'
            else return 'menu-close'
        }
    }
}