import { emailService } from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email--filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"
import emailNew from "../cmps/email-new.cmp.js"

export default {
    template: `
        <section class="email-app">
            <div class="main-grid">
                <email-filter @openNewEmailModal="toggleNewEmailModal" @showSent="showSentEmails" />
                <email-search @filterBy="filterBySearch" />
                <email-list @showDetails="showEmailDetails" :emails="emailsToShow" /> 
            </div>
            <email-new v-if="isNewEmail" @closeModal="toggleNewEmailModal" @sendEmail="sendEmail"/>
          
        </section>
    `,
    data() {
        return {
            emails: null, 
            isNewEmail: false,
            isSentEmail: false,
            filterBy: {
                filterSearch: null, 
                filterIsRead: null 
            } 
        }
    }, 
    created() {
        this.showEmails() 
    }, 
    components: {
        emailList, 
        emailFilter, 
        emailSearch, 
        emailNew
    }, 
    methods: {
        showEmails() {
            emailService.queryEmails()
            .then(emails => this.emails = emails)  
        },
        showEmailDetails(emailId) {
            emailService.getById(emailId)
                .then(email=> this.emailToShow = email)
        },
        toggleNewEmailModal() {
            this.isNewEmail = !this.isNewEmail
        }, 
        sendEmail(email) {
            emailService.addToSendsEmails(email)
        }, 
        filterBySearch(val) {
            this.filterBy.filterSearch = val
        },
        showSentEmails() {
            this.isSentEmail = !this.isSentEmail; 
            if(this.isSentEmail) {
                emailService.querySent()
                .then(emails => {
                    this.emails = emails})
            } else {
                this.showEmails()
            }
        }
    }, 
    computed: {
        emailsToShow() {
            if (!this.filterBy.filterSearch) return this.emails;
            const searchStr = this.filterBy.filterSearch.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
                       return email.name.toLowerCase().includes(searchStr) ||
                       email.subject.toLowerCase().includes(searchStr) 
            });
            return emailsToShow;
        }
    }
}