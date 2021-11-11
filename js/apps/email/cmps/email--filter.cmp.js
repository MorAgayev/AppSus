export default {
    props:[], 
    template: `
        <section class="email-filter">
            <ul>
                <li @click="openNewEmailModal">New Email</li>
                <li @click="showSent">Inbox</li>
                <li @click="showSent">Sent</li>
                <li>Read</li>
                <li>Unread</li>
            </ul>
        </section>
    `, 
    methods: {
        openNewEmailModal() {
            this.$emit('openNewEmailModal')
        }, 
        showSent() {
            this.$emit('showSent')
        }
    }
}