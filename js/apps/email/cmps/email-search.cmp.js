export default {
    props:[], 
    name:'email-search',
    template: `
        <section class="email-search">
            <input v-model="filterBy" @input="filter" type="text" placeholder="🔎 Search email">
            <select @change="setSort">
                <option value="DATE">Date</option>
                <option value="SUBJECT">Subject</option>
            </select>
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
        }, 
        setSort(ev) {
            this.$emit('sort', ev.target.value)
        }
    }
}