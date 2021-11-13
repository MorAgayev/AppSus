import { noteService } from '../services/note-service.js';

export default {
    props: ['note', 'todo', 'idx'],
    template: `
        <h4 @click="markTodo(todo)" :class="doneStyle">{{todo.txt}}</h4>
    `,
    data() {
        return {
            isDone: false
        }
    },
    methods: {
        markTodo(todo) {
            // Toggeling idDone Property:
            todo.isDone = !todo.isDone;
            // Setting isDone Data Property:
            this.isDone = todo.isDone;
            // Updating the Todo:
            this.note.info.todos[this.idx] = todo;
            // Updating the Storage Note:
            noteService.putNote(this.note)
        }
    },
    created() {
        // Keeping the Data Property in case page refreshed:
        this.isDone = this.todo.isDone;
    },
    computed: {
        doneStyle() {
            return { 'line-through': this.isDone }
        }
    },
}