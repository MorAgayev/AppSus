
import { noteService } from '../services/note-service.js';
import notePreview from '../cmps/note-preview.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import pinnedNotes from '../cmps/pinned-notes.cmp.js';
import emailNew from '../../email/cmps/email-new.cmp.js';

export default {
    template: `
        <section class="note-app">
            <form>
                <fieldset>
                    <legend>Add Your Note</legend>

                    <!-- Note Txt -->
                    <template>
                        <input @keydown.enter.prevent @blur="addNote('note-txt', $event)" type="text" placeholder="What's on your mind?" ref="txtInput" class="noteTxtInput">
                    </template>

                    <!-- Note Img -->
                    <template class="image-upload">
                        <label for="file-input">
                            <h2 class="fa fa-image fa-2x" :class="{blue: isImgUploaded}" title="Add Image"></h2>
                        </label>
                        <input @change="addNote('note-img', $event)" type="file" id="file-input" ref="imgInput">
                    </template>

                    <!-- Note Video -->
                    <template class="video-upload">
                        <i class="fa fa-youtube fa-2x" @click="searchOnYoutube" title="Search on Youtube" :class="{blue: isVideoUploaded}"></i>
                    </template>

                    <!-- Note Todos -->
                    <template class="toDoListCreation">
                        <i class="fa fa-list fa-2x" title="Create To-Do List" @click="openToDoList" :class="{blue: isToDoListChosen}"></i>
                        <ul v-if="isToDoListChosen">
                            <li v-for="count in toDoItemsCount">
                                <span>To Do</span>
                                <input @keydown.enter.prevent @input="typeToDo" @click="resetLettersCount" @keydown.tab="resetLettersCount" @blur="addToDoItem" type="text" placeholder="To Do..." class="toDoInput" ref="todoInput"> 
                            </li>
                        </ul>
                    </template>

                    <!-- Img Promo -->
                    <img v-if="isImgUploaded" :src="note.info.url" class="img-promo">

                    <!-- Adding Note Button -->
                    <legend><button @click="saveNote" class="add-btn">ADD</button></legend>
                </fieldset>
            </form>

            <note-filter @filtered="setFilter" @showAll="resetFilterBy" :notes="notes"/>

            <pinned-notes v-if="arePinned" :notes="pinnedNotes" @unpinNotes="unpinNotes"/>
            
            <main>
                <ul class="note-list">
                    <li v-for="note in notesToShow" :key="note.id">
                        <note-preview :note="note" @pinNote="pinNote" @removeNote="removeNote" @duplicateNote="duplicateNote" @setColor="setColor" @removeTodo="removeTodo" @sendViaEmail="sendViaEmail"/>
                    </li>
                </ul>
            </main>

            <email-new v-if="isEmailToSend" @closeModal="toggleEmailModal" @sendEmail="sendEmail" :emailToSendDetails="emailToSendDetails"/>
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
            inputLettersCount: 0,
            filterBy: null,
            arePinned: false,
            pinnedNotes: [],
            isEmailToSend: false,
            emailToSendDetails: null
        }
    },
    methods: {
        addNote(noteType, ev) {
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
        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
        },
        duplicateNote(noteId) {
            const note = this.notes.find(note => note.id === noteId);
            const noteIdx = this.notes.findIndex(note => note.id === noteId);
            noteService.duplicateNote(note, noteIdx)
                .then(this.loadNotes)
        },
        setColor(ev, noteId) {
            const chosenColor = ev.target.value;
            const note = this.notes.find(note => note.id === noteId);
            note.style.backgroundColor = chosenColor;
            noteService.putNote(note)
                .then(this.loadNotes)
        },
        removeTodo(todoIdx, noteId) {
            const note = this.notes.find(note => note.id === noteId);
            note.info.todos.splice(todoIdx, 1);;
            noteService.putNote(note)
                .then(this.loadNotes)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        resetFilterBy() {
            this.filterBy = null;
            this.loadNotes();
        },
        pinNote(noteId) {
            const noteIdx = this.notes.findIndex(note => note.id === noteId);
            var pinnedNote = this.notes[noteIdx];
            pinnedNote.isPinned = true;
            this.pinnedNotes.push(pinnedNote);
            this.notes.splice(noteIdx, 1);
            this.arePinned = true;
            this.removeNote(pinnedNote.id);
        },
        unpinNotes() {
            this.notes.push(...this.pinnedNotes)
            this.arePinned = false;
            noteService.postNotes(this.pinnedNotes)
                .then(this.loadNotes)
                .then(this.pinnedNotes = [])
        },
        sendViaEmail(noteId) {
            noteService.sendViaEmail(noteId)
                .then(res => this.emailToSendDetails = res)
                .then(this.toggleEmailModal())
        },
        toggleEmailModal() {
            this.isEmailToSend = !this.isEmailToSend
        },
        sendEmail(email) {
            noteService.sendEmail(email)
        },
        loadNotes() {
            noteService.queryNotes()
                .then(notes => this.notes = notes)
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const noteType = this.filterBy.type;
            const notesToShow = this.notes.filter(note => {
                return note.type === noteType;
            });
            return notesToShow;
        }
    },
    created() {
        this.loadNotes();
    },
    mounted() {
        this.$refs.txtInput.focus();
    },
    components: {
        notePreview,
        noteFilter,
        pinnedNotes,
        emailNew
    }
}
