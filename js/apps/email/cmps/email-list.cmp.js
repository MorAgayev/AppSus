import emailPreview from "./email-preview.cmp.js"

export default {
    props:['emails'],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email"/>
                </li>
            </ul>
        </section>
    `, 
    components: {
        emailPreview
    }, 
    methods: {
        // showDetails(emailId) {
        //     this.$emit('showDetails', emailId);
        // }
    }
}