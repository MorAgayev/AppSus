import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    props: ['note'],
    template: `
        <div class="note-preview">
            <component  
                        :is="note.type" 
                        :info="note.info">
            </component>
        </div>
    `,
    computed: {
    },
    components: {
        noteTxt,
        noteImg,
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
//         }
//     },
//     {
//         id: "n102",
//         type: "note-img",
//         isPinned: false,
//         info: {
//             url: "http://some-img/me",
//             title: "Bobi and Me"
//         },
//         style: {
//             backgroundColor: "#00d"
//         }
//     },
//     {
//         id: "n103",
//         type: "note-todos",
//         isPinned: false,
//         info: {
//             label: "Get my stuff together",
//             todos: [
//                 { txt: "Driving liscence", doneAt: null },
//                 { txt: "Coding power", doneAt: 187111111 }
//             ]
//         }
//     }
// ];