import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    props: ['note'],
    template: `
        <div class="note-preview">
            <component  
                        :is="note.type" 
                        :info="note.info"
                        :style="note.style">
            </component>
        </div>
    `,
    computed: {
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