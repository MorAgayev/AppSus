
export default {
    props: ['info'],
    template: `
        <div class="note-img">
            {{info.txt}}
            <img :src="info.url">
        </div>
    `,
}