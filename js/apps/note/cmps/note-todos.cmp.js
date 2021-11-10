
export default {
    props: ['info'],
    template: `
        <div class="note-todos">
            <h4>{{info.txt}}</h4>
            <ul>
                <li v-for="todo in info.todos">
                    {{todo.txt}}
                    <span>x</span>
                </li>
            </ul>
        </div>
    `,
}