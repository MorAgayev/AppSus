import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    props: ['note', 'note.id'],
    template: `
        <div class="note-preview" :class="openingStyle" :style="note.style" draggable="true">
            <component  
                        :note="note"
                        :is="note.type" 
                        :info="note.info"
                        @removeTodo="removeTodo">
            </component>

            <section class="note-controls">
                <!-- Pinning Note -->
                <h1 @click="$emit('pinNote', note.id)" title="Pin Note" class="fa fa-map-pin fa-2x"></h1>

                <!-- Removing Note: -->
                <h1 @click="$emit('removeNote', note.id)" title="Remove Note" class="fa fa-trash fa-2x"></h1>

                <!-- Duplicating Note: -->
                <h1 @click="$emit('duplicateNote', note.id)" title="Duplicate Note" class="fa fa-clone fa-2x"></h1>
                
                <!-- Setting Note Color: -->
                <input @input="$emit('setColor', $event, note.id)" type="color" id="color-input">

                <!-- Sending Note via Email: -->
                <h1 @click="$emit('sendViaEmail', note.id)" title="Send via Email" class="fa fa-paper-plane fa-2x"></h1>
            </section>
        </div>
    `,
    data() {
        return {
            isNew: true,
            id: '',
            colorInput: ''
        }
    },
    methods: {
        log(parameter) {
            console.log(parameter);
        },
        removeTodo(todoIdx) {
            this.$emit('removeTodo', todoIdx, this.note.id)
        },
    },
    created() {
        setTimeout(() => { this.isNew = false }, 1000);
    },
    computed: {
        openingStyle() {
            return { shadow: this.isNew }
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
    }
}
