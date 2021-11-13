import emailPreview from "./email-preview.cmp.js"
// import { emailService } from "../service/email.service.js"

export default {
    props: ['emails'],

    name: 'emails-list',

    template: `
        <section v-if="emails" class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email" @setIsRead="changeRead" @changeStared="changeStared" @removeEmail="removeEmail" @sentToNotes="sentToNotes"/>
                </li>
            </ul>
        </section>
    `,

    components: {
        emailPreview
    },

    methods: {
        changeRead(id) {
            this.$emit('changeRead', id)
        }, 

        changeStared(emailId) {
            this.$emit('changeStared', emailId)
        }, 
        
        removeEmail(id) {
            this.$emit('removeEmail', id)
        }, 

        sentToNotes(email) {
            this.$emit('sentToNotes', email)
        }
        
    }
}