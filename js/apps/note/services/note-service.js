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
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            title: "Bobi and Me",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1280px-Flag_of_Israel.svg.png"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];

// _createNotes();