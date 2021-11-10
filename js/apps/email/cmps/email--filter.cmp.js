export default {
    props:[], 
    template: `
        <section class="email-filter">
            <ul>
                <li @click="openNewEmailModal">New Email</li>
                <li>Read</li>
                <li>Unread</li>
            </ul>
        </section>
    `, 
    methods: {
        openNewEmailModal() {
            this.$emit('openNewEmailModal')
        }
    }
}