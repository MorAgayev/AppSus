export default {
    template: `
         <section class="new-email">
            <div class="new-title">
                <h4>New Email</h4>
                <button @click="closeModal">X</button>
            </div>
            <form @submit.prevent="sendEmail" class="new-form">
                <input v-model="email" type="email" placeholder="Email">
                <input v-model="name" type="text" placeholder="Name">
                <input v-model="subject" type="text" placeholder="Subject">
                <textarea v-model="body" ></textarea>
                <button>send</button>
            </form>
        </section>
    `, 
    data() {
        return {
            date: new Date,
            email: '', 
            name: '',
            subject: '',
            body: ''
        }
    }, 
    methods: {
        closeModal() {
            this.$emit('closeModal')
        }, 
        sendEmail() {
            const emailDetails = {
                email: this.email, 
                name: this.name,
                subject: this.subject,
                body: this.body,
                sendAt: new Date
            }
            this.$emit('sendEmail', emailDetails)

        }
    }
}

//createEmail(name,subject, body)