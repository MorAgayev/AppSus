import labelsTypes from '../cmps/labels-types.cmp.js';
import { noteService } from '../services/note-service.js';

export default {
    props: ['notes'],
    template: `
        <section class="note-filter">
            <section class="labels-container">
                <div v-for="type in types">
                    <labels-types :type="type" @labelClicked="filterByType" />
                </div>
                <h3 @click="$emit('showAll')" class="label">ALL</h3>
            </section>
        </section>
    `,
    data() {
        return {
            filterBy: {
                type: ''
            },
            types: ['note-txt', 'note-img', 'note-video', 'note-todos'],
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        filterByType(type) {
            this.filterBy.type = type;
            this.filter();
            this.isSelected = true;
        }
    },
    components: {
        labelsTypes
    }
}