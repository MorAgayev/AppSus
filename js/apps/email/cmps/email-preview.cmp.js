export default {
    props:['email'],

    name: 'email-preview',

    template: `
            <article @click="showDetails" :class="previewStyle" class="email-preview">
                <input type="checkbox" @click.stop="changeStared">
                <button @click.stop="setIsRead">{{btnRead}}</button>
                <span>{{email.name}}</span>
                <span>{{email.subject}}</span>
                <span>{{setDate}}</span>
                <button @click.stop="removeEmail">X</button>
            </article>
    `,

    data() {
        return {
            isRead: true
        }
    },

    methods: {
        setIsRead() {
            this.$emit('setIsRead', this.email.id)
            this.isRead = !this.isRead
        },

        changeStared() {
            this.$emit('changeStared', this.email.id)
        },

        showDetails() {
            this.setIsRead()
            this.$router.push(`details/${this.email.id}`)
        },

        removeEmail() {
            this.$emit('removeEmail', this.email.id)
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
        }, 

        btnRead() {
            if(this.email.isRead) return 'Unread'
            else return 'Read'
        }  
    }
}