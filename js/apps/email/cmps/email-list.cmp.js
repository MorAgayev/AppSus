import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../service/email.service.js"

export default {
    props: ['emails'],
    template: `
        <section v-if="emails" class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email" @changeStaring="changeStaring"  />
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview
    },
    methods: {
        changeStaring(emailId) {
            this.$emit('changeStaring', emailId)
            // emailService.getById(emailId)
            //     .then(email => {
            //         if (email) {
            //             email.isStar = !email.isStar
            //             emailService.putEmail(email)
            //         } 
            //         else {
            //             emailService.getSentById(emailId)
            //             .then(email => {
            //                 email.isStar = !email.isStar
            //                 emailService.putSent(email)
            //             })
            //         } 
            //     })
        }, 
        
    }
}