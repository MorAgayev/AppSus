import {
    emailService
} from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email--filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"
import emailNew from "../cmps/email-new.cmp.js"
// import userMsg from "../../../cmps/user-msg.cmp.js"
export default {
    template: `
        <section class="email-app">
            <div class="main-grid">
                <email-filter :unread="unread" @toggleNewEmailModal="toggleNewEmailModal" @filterBy="setFilterBy" />
                <email-search @filterBy="filterBySearch" @sort="setSort" />
                <email-list :emails="emailsToShow" @changeStaring="changeStaring"/> 
            </div>
            <email-new v-if="isNewEmail" @closeModal="toggleNewEmailModal" @sendEmail="sendEmail" @toggleNewEmailModal="toggleNewEmailModal"/>
          
        </section>
    `,
    data() {
        return {
            emails: null,
            isNewEmail: false,
            isSentEmail: false,
            filterSearch: null,
            filterBy: null,
            sortBy: null,
            unread: undefined
        }
    },
    created() {
        this.showEmails()
        this.setRead()
    },
    components: {
        emailList,
        emailFilter,
        emailSearch,
        emailNew
    },
    methods: {
        showEmails() {
           return emailService.queryEmails()
                .then(emails => this.emails = emails)
        },
        showSentEmails() {
            emailService.querySent()
                .then(emails => {this.emails = emails})
        },
        showReadEmails() {
            this.emails = this.emails.filter(email=> email.isRead === true)
        },
        showUnreadEmails() {
            this.emails = this.emails.filter(email=> email.isRead === false)
        },
        showStaredEmails() {
            this.emails = this.emails.filter(email=> email.isStar === true)
        },
        sendEmail(email) {
            emailService.addToEmails(email)
            this.toggleNewEmailModal()
            this.setRead() 
        },
        toggleNewEmailModal() {
            this.isNewEmail = !this.isNewEmail
        },
        filterBySearch(val) {
            this.filterSearch = val
        },
        changeStaring(emailId) {
            emailService.getById(emailId)
                .then(email => {
                    if (email) {
                        email.isStar = !email.isStar
                        emailService.putEmail(email)
                    } else {
                        emailService.getSentById(emailId)
                            .then(email => {
                                email.isStar = !email.isStar
                                emailService.putSent(email)
                            })
                    }
                })
        },
        setFilterBy(type) {
            if(type === 'inbux') this.showEmails()
            if(type === 'sent') this.showSentEmails()
            if(type === 'read') this.showReadEmails()
            if(type === 'unread') this.showUnreadEmails()
            if(type === 'stared') this.showStaredEmails()
        },
        setRead() {
            emailService.setUnread()
                .then(num=> this.unread = num)
        },
        setSort(val) {
            this.sortBy = val
            this.sorting()
        }, 
        sorting() {
            if(!this.sortBy) return this.emails;
            if(this.sortBy === 'SUBJECT') {
                this.emails.sort((a , b) => {return (a.subject > b.subject) ? 1 : -1})
            } else {
                this.emails.sort((a , b) => {return (a.sentAt > b.sentAt) ? 1 : -1})
            }
        }
    },
    computed: {
        emailsToShow() {
            if(this.isSentEmail)  this.showSentEmails() 
            if (!this.filterSearch) return this.emails;
            const searchStr = this.filterSearch.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
                return email.name.toLowerCase().includes(searchStr) ||
                    email.subject.toLowerCase().includes(searchStr)
            });
            return emailsToShow;
        },
        
    }, 
    watch: {
        heandle() {
            let count =5;
            this.showEmails()
                .then(emails =>{
                        emails.forEach(email => {if(!email.isRead) count++});
                    })
            this.unread = count;
        }
    }
}


// add <user-msg />