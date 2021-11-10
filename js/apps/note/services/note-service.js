import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';


const NOTES_KEY = 'notes';


export const noteService = {
    queryNotes
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
            txt: "My Song!",
            url: "https://www.youtube.com/embed/tgbNymZ7vqY"
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