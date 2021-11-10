import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../service/email.service.js"

export default {
    template: `
        <section v-if="emails" class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email" @setToRead="setToRead" />
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: null
        }
    },
    created() {
        emailService.queryEmails()
            .then(emails => this.emails = emails)
    },
    components: {
        emailPreview
    }, 
    methods: {
        setToRead(id) {
            console.log('id', id);
            emailService.setToRead(id) 
        }
        // showDetails(emailId) {
        //     this.$emit('showDetails', emailId);
        // }
    }
}