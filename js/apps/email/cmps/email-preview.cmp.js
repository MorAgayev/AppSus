export default {
    props: ['email'],

    name: 'email-preview',

    template: `
            <article @click="showDetails" :class="previewStyle" class="email-preview" @mouseover="hover=true" @mouseleave="hover=false">
                <div class="preview-start">
                    <li @click.stop="changeStared" class="fa fa-star" :class="setStarred"></li>
                    <span>{{email.name}}</span>
                </div>
                <div class="preview-subject">{{email.subject}} - {{email.body}}</div>
                <div class="preview-actions" v-if="hover" >
                    <li @click.stop="setIsRead" class="fa fa-inbox"></li>
                    <li  @click.stop="removeEmail" class="fa fa-trash-o"></li>
                    <li  class="fa fa-paper-plane"></li>
                </div>
                <span v-else>{{setDate}}</span>
            </article>
    `,

    data() {
        return {
            isRead: true,
            hover: false, 
            isStarred: false
        }
    },

    methods: {
        setIsRead() {
            this.$emit('setIsRead', this.email.id)
            this.isRead = !this.isRead
        },

        changeStared() {
            this.$emit('changeStared', this.email.id)
            this.isStarred = !this.isStarred
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
            var dateStr = d.toString().slice(4, 10)
            return dateStr;
        },

        previewStyle() {
            if (this.email.isRead) return {'read-email': true}
            else return {'unread-email': true}
        },

        btnRead() {
            if (this.email.isRead) return 'Unread'
            else return 'Read'
        }, 

        setStarred() {
            if(this.isStarred) return {'starred' : true}
            else return {'unstarred': true}
        }
    }
}