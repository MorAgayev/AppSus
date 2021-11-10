export default {
    props:['email'],
    template: `
            <article :class="prevBgColor" class="email-preview">
                <span>{{email.name}}</span>
                <span>{{email.subject}}</span>
                <span>{{setDate}}</span>
                <router-link :to="'details/'+email.id">go</router-link>
            </article>
                

    `,
    mathods: {
        
    },
    computed: {
        setDate() {
            return this.email.sentAt
        //    const date = this.email.sentAt
        //    console.log(date.getYear(), 'date');
        }, 
        prevBgColor() {
            if(this.email.isRead) return 'read-email'
            else return 'unread-email'
        }
    }, 

}