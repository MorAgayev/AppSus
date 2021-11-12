// import {
//     emailService
// } from "../service/email.service.js"
export default {
    props: ['unreadEmails'],
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <ul>
                <li @click="openNewEmail()">New Email</li>
                <li @click="setFilter('inbox')">inbox <span>{{unreadEmails}}</span></li>
                <li @click="setFilter('sent')">sent</li>
                <li @click="setFilter('trash')">trash</li>
                <li @click="setFilter('draft')">draft</li>
            </ul>
        </section>
    `,
    mounted() {
        console.log(this.unreadEmails);
    },
    methods: {
        setFilter(val) {
            this.$emit('filterd', val)
        }, 

        openNewEmail() {
            this.$emit('OpenNewEmail')
        }
    }, 
    // template: `
    //     <section class="email-filter">
    //         <ul>
    //             <li @click="toggleNewEmailModal">New Email</li>
    //             <li @click="filterBy('inbux')">Inbox <span v-if="unread">{{unread}}</span></li>
    //             <li @click="filterBy('sent')">Sent</li>
    //             <li @click="filterBy('read')">Read</li>
    //             <li @click="filterBy('unread')">Unread</li>
    //             <li @click="filterBy('stared')">Stared</li>
    //         </ul>
    //     </section>
    // `,
    // data() {
    //     return {
    //         filterByType: {
    //             status: '', //inbox/sent/trash/draft
    //             // txt: '', // no need to support complex text search
    //             isRead: false, // (optional property, if missing: show all)
    //             isUnread: false, // (optional property, if missing: show all)
    //             isStared: false, // (optional property, if missing: show all)
    //             // lables: ['important', 'romantic'] // has any of the labels
    //         },
    //         // unread: 0
    //     }
    // },
    // // created() {
    // //     emailService.setUnread()
    // //         .then(num => this.unread = num)
    // // },
    // // watch: {
    // //     unread: {
    // //         handler() {
    // //             emailService.setUnread
    // //                 .then((num)=> console.log('hello', num))
    // //             },
    // //             immediate: true
    // //         }
    // // },
    // methods: {
    //     toggleNewEmailModal() {
    //         this.$emit('toggleNewEmailModal')
    //     },
    //     filterBy(type) {
    //         console.log('type', type)
    //         this.$emit('filterBy', type)
    //     },
    //     // showSent() {
    //     //     this.$emit('showSent')
    //     // }, 

    // },
    // computed: {
    //     // showUnread() {

    //     //     let count =0;
    //     //     emailService.queryEmails()
    //     //         .then(emails => emails.forEach(email => {if(!email.isRead) count++}))
    //     //     this.unread = count;
    //     //     return count
    //     // }
    // }
}