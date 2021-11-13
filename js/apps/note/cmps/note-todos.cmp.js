import todoPreview from '../cmps/todo-preview.cmp.js';

export default {
    props: ['note', 'id', 'info'],
    template: `
        <div class="note-todos">
            <h3>{{info.txt}}</h3>
            <ul>
                <li v-for="(todo, idx) in info.todos">
                    <todo-preview :note="note" :todo="todo" :idx="idx" @markTodo="$emit('markTodo')"/>
                    <span @click="$emit('removeTodo', idx)">x</span>
                </li>
            </ul>
        </div>
    `,
    methods: {
        log(parameter) {
            console.log(parameter);
        }
    },
    components: {
        todoPreview
    }
}
