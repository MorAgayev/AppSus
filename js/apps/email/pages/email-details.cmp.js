import { emailService } from "../service/email.service.js"
export default {
    template: `
        <section class="email-datails">
            <button>X</button>
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
            email: ''
        }
    }, 
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email=> this.email = email)
        
    }
}