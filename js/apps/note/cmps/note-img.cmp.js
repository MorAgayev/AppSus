
export default {
    props: ['info'],
    template: `
        <div class="note-img">
            {{info.title}}
            <img :src="info.url">
        </div>
    `,
}