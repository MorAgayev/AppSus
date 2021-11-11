export default {
    props:['email'],
    template: `
            <article @click="setToRead" :class="previewStyle" class="email-preview">
                <input type="checkbox"  @click="changeStaring">
                <span>{{email.name}}</span>
                <span>{{email.subject}}</span>
                <span>{{setDate}}</span>
                <router-link :to="'details/'+email.id">go</router-link>
            </article>
    `,
    data() {
        return {
        }
    },
    methods: {
        setToRead() {
            console.log('setToRead');
            this.$emit('setToRead', this.email.id)
        },
        changeStaring() {
            this.$emit('changeStaring', this.email.id)
        }

    }, 
    computed: {
        setDate() {
            return this.email.sentAt
        //    const date = this.email.sentAt
        //    console.log(date.getYear(), 'date');
        }, 
        previewStyle () {
            if (this.email.isRead) return {'read-email': true}
            else return {'unread-email': true}
        },
        isStar() {
            return this.email.isStar
        } 
    }, 

}