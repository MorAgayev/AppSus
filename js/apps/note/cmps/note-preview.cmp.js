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


// const gNotes = [
//     {
//         id: "n101",
//         type: "note-txt",
//         isPinned: false,
//         info: {
//             txt: "Fullstack Me Baby!"
//         },
//         style: {
//             backgroundColor: "dimgray",
//             padding: '10px'
//         }
//     },
//     {
//         id: "n102",
//         type: "note-img",
//         isPinned: false,
//         info: {
//             txt: "Bobi and Me",
//             url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1280px-Flag_of_Israel.svg.png"
//         },
//         style: {
//             backgroundColor: "lightskyblue",
//             padding: '10px'
//         }
//     },
//     {
//         id: "n103",
//         type: "note-video",
//         isPinned: false,
//         info: {
//             txt: "My Song!",
//             url: "https://www.youtube.com/embed/tgbNymZ7vqY"
//         },
//         style: {
//             backgroundColor: "lightsalmon",
//             padding: '10px'
//         }
//     },
//     {
//         id: "n104",
//         type: "note-todos",
//         isPinned: false,
//         info: {
//             txt: "Get my stuff together",
//             todos: [
//                 { txt: "Driving liscence", doneAt: null },
//                 { txt: "Coding power", doneAt: 187111111 }
//             ]
//         },
//         style: {
//             backgroundColor: "lightgreen",
//             padding: '10px'
//         }
//     }
// ];