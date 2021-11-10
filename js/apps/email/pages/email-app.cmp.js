import { emailService } from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email--filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"
import emailNew from "../cmps/email-new.cmp.js"

export default {
    template: `
        <section class="email-app">
            <div class="main-grid">
                <email-filter @openNewEmailModal="toggleNewEmailModal" />
                <email-search />
                <email-list @showDetails="showEmailDetails" /> 
            </div>
            <email-new v-if="isNewEmail" @closeModal="toggleNewEmailModal" @sendEmail="sendEmail"/>
          
        </section>
    `,
    data() {
        return {
            emails: null, 
            isNewEmail: false,
        }
    }, 
    created() {
        emailService.queryEmails()
            .then(emails => this.emails = emails)  
    }, 
    components: {
        emailList, 
        emailFilter, 
        emailSearch, 
        emailNew
        // emailDetails
    }, 
    methods: {
        showEmailDetails(emailId) {
            emailService.getById(emailId)
                .then(email=> this.emailToShow = email)
        },
        toggleNewEmailModal() {
            this.isNewEmail = !this.isNewEmail
        }, 
        sendEmail(email) {
            // console.log(email);
            emailService.addToSendsEmails(email)
        }
    }
}