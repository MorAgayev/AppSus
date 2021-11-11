export default {
    props:[], 
    name:'email-search',
    template: `
        <section class="email-search">
            <input v-model="filterBy" @input="filter" type="text" placeholder="🔎 Search email">
        </section>
    `, 
    data() {
        return {
            filterBy: ''
        };
    },
    methods:{
        filter() {
            this.$emit('filterBy', this.filterBy)
        }
    }
}