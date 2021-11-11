// import { eventBus } from "../../../services/event-bus.js"

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
                <textarea v-model="body"></textarea>
                <button>Send</button>
                <!-- <button @click="toggleNewEmailModal">Send</button> -->
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
            // console.log('emailDetails', emailDetails);
            this.$emit('sendEmail', emailDetails)
            // userMsg('success', 'Email Sent succesfully')
        },
        toggleNewEmailModal() {
            this.$emit('toggleNewEmailModal')
        } 
        // userMsg(type, txt) {
        //     const msg = {
        //         txt,
        //         type
        //     }
        //     eventBus.$emit('showMsg', msg);
        // },
    }
}

//createEmail(name,subject, body)