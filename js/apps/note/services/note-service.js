import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';

export const noteService = {
    queryNotes,
    postNote,
    // postNotes,
    removeNote,
    getYoutubeVid
};

function queryNotes() {
    return storageService.query(NOTES_KEY)
        .then(notes => notes)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = gNotes;
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function postNote(note) {
    return storageService.post(NOTES_KEY, note)
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

// function postNotes(notes) {
//     return storageService.postMany(NOTES_KEY, notes)
// }


const API_KEY = 'AIzaSyC2naoqUzLAdkFOCeIib38MU8fsFykr3og';
function getYoutubeVid(searchVal) {
    var vids = {}
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${searchVal}`)
        .then(res => {
            console.log('getting data from server');
            vids[searchVal] = res.data.items
            return res.data.items;
        })
}

const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "dimgray",
            padding: '10px'
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            txt: "Flag",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1280px-Flag_of_Israel.svg.png"
        },
        style: {
            backgroundColor: "lightskyblue",
            padding: '10px'
        }
    },
    {
        id: "n103",
        type: "note-video",
        isPinned: false,
        info: {
            txt: "First Youtube Video Ever",
            url: "https://www.youtube.com/embed/jNQXAC9IVRw"
        },
        style: {
            backgroundColor: "lightsalmon",
            padding: '10px'
        }
    },
    {
        id: "n104",
        type: "note-todos",
        isPinned: false,
        info: {
            txt: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "lightgreen",
            padding: '10px'
        }
    },
];

_createNotes();