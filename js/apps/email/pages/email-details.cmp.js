import { emailService } from "../service/email.service.js"
export default {
    template: `
        <section v-if="email" class="email-datails">
            <div class="details-btn">
                <router-link to="/email">Back</router-link>
                <button @click="removeEmail">Delete</button>
            </div>
            <div class="top-details">
                <h4>{{email.name}}</h4>
                <small>{{email.to}}</small>
                <p>{{email.sentAt}}</p>
            </div>
            <div class="details-body">
                <p>{{email.body}}</p>
            </div>

        </section>
    `, 
    data() {
        return {
            email:  null
        }
    }, 
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email=> this.email = email)
        
    }, 
    methods: {
        removeEmail() {
            emailService.removeEmail(this.email.id)
            this.$router.push('/email')
            // emailService.getById(this.email.id)
        }
    }
}