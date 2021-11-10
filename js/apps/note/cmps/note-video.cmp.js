
export default {
    props: ['info'],
    template: `
        <div class="note-video">
            {{info.txt}}
            <iframe :src="info.url" frameborder="0"></iframe>
        </div>
    `,
}