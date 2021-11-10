import { emailService } from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email--filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"


export default {
    template: `
        <section class="email-app">
            <div class="main-grid">
                <email-filter />
                <email-search />
                <email-list @showDetails="showEmailDetails" :emails="emails" /> 
            </div>
            
        </section>
    `,
    data() {
        return {
            emails: null, 
            emailToShow: null
        }
    }, 
    created() {
        emailService.queryEmails()
            .then(emails => {this.emails = emails; console.log('this.emails', this.emails)})  
    }, 
    components: {
        emailList, 
        emailFilter, 
        emailSearch, 
        // emailDetails
    }, 
    methods: {
        showEmailDetails(emailId) {
            emailService.getById(emailId)
                .then(email=> this.emailToShow = email)
        }
    }
}