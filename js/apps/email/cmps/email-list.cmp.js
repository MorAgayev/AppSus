import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../service/email.service.js"

export default {
    props: ['emails'],
    template: `
        <section v-if="emails" class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email" @changeStaring="changeStaring" />
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            // emails: null
        }
    },
    created() {
        // emailService.queryEmails()
        //     .then(emails => this.emails = emails)
    },
    components: {
        emailPreview
    }, 
    methods: {
        changeStaring(emailId) {
            emailService.getById(emailId) 
                .then(email=> {
                    if(email) email.isStaring = !email.isStaring
                    // emailService.putEmail(email)}
                            else emailService.getSentById(id)
                                .then(email=> email.isStaring =  !email.isStaring)
            })
        }
        // setToRead(id) {
        //     console.log('id', id);
        //     emailService.setToRead(id) 
        // }
        // showDetails(emailId) {
        //     this.$emit('showDetails', emailId);
        // }
    }
}