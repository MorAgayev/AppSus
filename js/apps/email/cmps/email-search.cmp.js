export default {
   name:'email-search',

    template: `
        <section class="email-search">
            <div class="search-container">
                <input v-model="filterBy" @input="filter" type="text" placeholder="🔎 Search email">
                <select @change="setIsRead">
                    <option value="READ">All</option>
                    <option value="READ">Read</option>
                    <option value="UNREAD">Unread</option>
                    <option value="STARRED">Starred</option>
                    <option value="UNSTARRED">Unstarred</option>
                </select>
            </div>
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
        }, 

        setIsRead(ev) {
            this.$emit('setIsRead', ev.target.value)
        }
    }
}