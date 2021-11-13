// import { eventBus } from "../../../services/event-bus.js"

export default {
    name: 'email-new',

    props: ['emailToSendDetails'],

    template: `
         <section class="new-email">
            <div class="new-title">
                <h4>New Email</h4>
                <button @click="closeModal">X</button>
            </div>
            <form @submit.prevent="sendEmail" class="new-form">
                <input v-model="to" type="email" placeholder="Email">
                <input v-model="name" type="text" placeholder="Name">
                <input v-model="subject" type="text" placeholder="Subject">
                <textarea v-model="body"></textarea>
                <button>Send</button>
            </form>
        </section>
    `,

    created() {
        let draftInterval = setInterval(() => this.saveDraft(), 5000)
    },

    destroyed() {
        clearInterval(draftInterval)
    },

    data() {
        return {
            to: '',
            name: '',
            subject: '',
            body: '',
        }
    },

    methods: {
        saveDraft() {
            return {
                status: 'draft',
                email: this.email,
                name: this.name,
                subject: this.subject,
                body: this.body,
                sendAt: Date.now()
            }
        },

        closeModal() {
            const email = this.saveDraft()
            this.$emit('closeModal', email)
        },

        sendEmail() {
            const emailDetails = {
                status: 'sent',
                email: this.email,
                name: this.name,
                subject: this.subject,
                body: this.body,
                sendAt: Date.now()
            }
            this.$emit('sendEmail', emailDetails)
        },

        setBody() {
            if (!this.emailToSendDetails) return '';
            else {
                this.body = this.emailToSendDetails.body;
            }
        }

    },

    mounted() {
        this.setBody();
    }

}
