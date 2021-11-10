
export default {
    props: ['info'],
    template: `
        <div class="note-video">
            {{info.title}}
            <iframe :src="info.url" frameborder="0"></iframe>
        </div>
    `,
}