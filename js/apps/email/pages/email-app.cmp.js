import { emailService } from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email--filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"
import emailDetails from "../cmps/email-details.cmp.js"
export default {
    template: `
        <section class="email-app">
            <email-filter />
            <email-search />
            <email-list :emails="emails" /> 
            <email-details />
        </section>
    `,
    data() {
        return {
            emails: null
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
        emailDetails
    }
}