import { noteService } from '../services/note-service.js';
import notePreview from '../cmps/note-preview.cmp.js';

export default {
    template: `
        <section class="note-app">
            <h1>Note App</h1>
            <ul class="note-list">
                <li v-for="note in notes" :key="note.id" class="note-preview-container">
                    <note-preview :note="note" @click.native="select(note)" />
                    <!-- <router-link :to="'/note/'+note.id" class="details-link">Details</router-link> -->
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.queryNotes()
            .then(notes => this.notes = notes)
    },
    components: {
        notePreview
    }
}