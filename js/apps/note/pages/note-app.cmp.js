// import { utilService } from '../../../services/util-service.js';
import { noteService } from '../services/note-service.js';
import notePreview from '../cmps/note-preview.cmp.js';

export default {
    template: `
        <section class="note-app">
            <h1>Note App</h1>

            <form>
                <fieldset>
                    <legend>Add Your Note</legend>

                    <template>
                        <input @keydown.enter.prevent @blur="addNote('note-txt', $event)" type="text" placeholder="What's on your mind?" ref="txtInput" class="noteTxtInput">
                        <!-- <i class="fa fa-font" title="Write Text" @click="addNote('note-txt', $event)"></i> -->
                    </template>

                    <template class="image-upload">
                        <label for="file-input">
                            <h2 class="fa fa-image" :class="{blue: isImgUploaded}" title="Add Image"></h2>
                        </label>
                        <input @change="addNote('note-img', $event)" type="file" id="file-input" ref="imgInput">
                    </template>

                    <template class="video-upload">
                        <i class="fa fa-youtube" @click="searchOnYoutube" title="Search on Youtube" :class="{blue: isVideoUploaded}"></i>
                    </template>

                    <template class="toDoListCreation">
                        <i class="fa fa-list" title="Create To-Do List" @click="openToDoList" :class="{blue: isToDoListChosen}"></i>
                        <ul v-if="isToDoListChosen">
                            <li v-for="count in toDoItemsCount">
                                <span>To Do</span>
                                <input @keydown.enter.prevent @input="typeToDo" @click="resetLettersCount" @blur="addToDoItem" type="text" placeholder="To Do..." class="toDoInput" ref="todoInput"> 
                            </li>
                        </ul>
                    </template>

                    <img v-if="isImgUploaded" :src="note.info.url" class="img-promo">

                    <legend><button @click="saveNote">ADD</button></legend>
                </fieldset>
            </form>

            <ul class="note-list">
                <li v-for="note in notes" :key="note.id" class="note-preview-container">
                    <note-preview :note="note" @removeNote="removeNote"/>
                    <!-- @click.native="select(note)" -->
                    <!-- <router-link :to="'/note/'+note.id" class="details-link">Details</router-link> -->
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: null,
            note: {
                type: '',
                isPinned: false,
                info: {
                    txt: ''
                },
                style: {
                    backgroundColor: '',
                    padding: '10px'
                }
            },
            isImgUploaded: false,
            isVideoUploaded: false,
            isToDoListChosen: false,
            todos: [],
            toDoItemsCount: 0,
            inputLettersCount: 0
        }
    },
    methods: {
        log(parameter) {
            console.log(parameter);
        },
        addNote(noteType, ev) {
            // this.note.type = noteType;
            if (noteType === 'note-txt') this.addTxt(noteType, ev);
            if (noteType === 'note-img') this.addImg(noteType, ev);
        },
        addTxt(noteType, ev) {
            this.note.type = noteType;
            this.note.info.txt = ev.target.value;
        },
        addImg(noteType, ev) {
            this.isImgUploaded = true;
            const file = ev.target.files[0];
            this.note.info.url = URL.createObjectURL(file);
            this.note.type = noteType;
        },
        searchOnYoutube() {
            this.isVideoUploaded = true;
            const searchVal = this.note.info.txt;
            noteService.getYoutubeVid(searchVal)
                .then(this.saveVideo)
        },
        saveVideo(videos) {
            console.log('videos:', videos);
            var firstVideoId = videos[0].id.videoId;
            console.log(firstVideoId);
            this.note.info.url = `https://www.youtube.com/embed/${firstVideoId}`;
            this.note.type = 'note-video';
            this.saveNote();
        },
        onSelectedVid(id) {
            document.querySelector('iframe').src = `https://www.youtube.com/embed/${id}`;
        },
        openToDoList() {
            this.isToDoListChosen = true;
            this.toDoItemsCount++;
        },
        typeToDo() {
            this.inputLettersCount++
            if (this.inputLettersCount === 1) this.toDoItemsCount++;
        },
        addToDoItem(ev) {
            this.note.type = 'note-todos';
            this.todos.push({ txt: ev.target.value })
            this.note.info.todos = this.todos;
        },
        resetLettersCount() {
            this.inputLettersCount = 0;
        },
        saveNote() {
            this.$refs.txtInput.value = '';
            this.isImgUploaded = false;
            this.isVideoUploaded = false;
            this.isToDoListChosen = false;
            this.toDoItemsCount = 0;
            this.todos = [];
            noteService.postNote(this.note)
                .then(this.loadNotes)
        },
        saveNotes() {
            noteService.updateNotes(this.notes)
            // .then(this.loadNotes)
        },
        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
        },
        loadNotes() {
            noteService.queryNotes()
                .then(notes => this.notes = notes)
        }
    },
    created() {
        this.loadNotes();
    },
    mounted() {
        this.$refs.txtInput.focus();
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