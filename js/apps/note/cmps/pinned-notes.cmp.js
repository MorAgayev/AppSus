import notePreview from '../cmps/note-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
        <section class="pinned-container">
            <h1>Pinned Notes</h1>
            <ul>
                <li v-for="note in notes">
                    <note-preview :note="note"/>
                </li>
            </ul>
            <button @click="unpinNotes">Unpin Notes</button>
        </section>
    `,
    methods: {
        unpinNotes() {
            this.$emit('unpinNotes');
        }
    },
    components: {
        notePreview
    }
}


// @pinNote="" @removeNote="removeNote" @setColor="setColor" @removeTodo="removeTodo"