
export default {
    props: ['info'],
    template: `
        <div class="note-todos">
            {{info.label}}
            <ul v-for="todo in info.todos">
                <li>{{todo.txt}}</li>
            </ul>
        </div>
    `,
}