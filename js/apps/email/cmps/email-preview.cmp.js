import { emailService } from '../service/email.service.js'
export default {
    props:['email'],
    template: `
            <article @click="showDetails" :class="previewStyle" class="email-preview">
                <input type="checkbox" v-model="email.isStar"  @click.stop="changeStaring">
                <button @click.stop="setToRead">setToRead</button>
                <span>{{email.name}}</span>
                <span>{{email.subject}}</span>
                <span>{{setDate}}</span>
            </article>
    `,
    data() {
        return {
        }
    },
    methods: {
        setToRead() {
            // this.setRead()
            emailService.setUnread()
                .then(this.setRead)
        },
        changeStaring() {
            this.$emit('changeStaring', this.email.id)
        },
        showDetails() {
            this.$router.push(`details/${this.email.id}`)
            // this.setRead()
            emailService.setUnread()
                .then(this.setRead)
        },
        setRead() {
            emailService.getById(this.email.id)
            .then(email => {
                if (email) {
                    email.isRead = !email.isRead
                    emailService.putEmail(email)
                } 
                else {
                    emailService.getSentById(this.email.id)
                    .then(email => {
                        email.isRead = !email.isRead
                        emailService.putSent(email)
                    })
                } 
            })
        }

    }, 
    computed: {
        setDate() {
            var d = new Date(this.email.sentAt);
            var dateStr = d.toString().slice(4,15)
            return dateStr;
        }, 
        previewStyle() {
            if (this.email.isRead) return {'read-email': true}
            else return {'unread-email': true}
        }  
    }
}