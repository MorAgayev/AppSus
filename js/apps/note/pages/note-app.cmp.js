import { utilService } from '../../../services/util-service.js';
import { noteService } from '../services/note-service.js';
import notePreview from '../cmps/note-preview.cmp.js';

export default {
    template: `
        <section class="note-app">
            <h1>Note App</h1>
            <label>
                <input v-model="note.info.txt" type="text" placeholder="What's on your mind..." ref="noteInput">
            </label>
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
            notes: null,
            note: {
                id: utilService.makeId(),
                type: '',
                isPinned: false,
                info: {
                    txt: ''
                },
                style: {
                    backgroundColor: '',
                    padding: '10px'
                }
            }
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