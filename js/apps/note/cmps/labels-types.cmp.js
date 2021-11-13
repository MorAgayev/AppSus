
export default {
    props: ['type'],
    template: `
        <h3 @click="$emit('labelClicked', type)" class="label">{{labelsToShow}}</h3>
    `,
    computed: {
        labelsToShow() {
            const strLength = this.type.length;
            var type = this.type.substring(5, strLength);
            switch (type) {
                case 'txt':
                    type = 'text';
                    break;
                case 'img':
                    type = 'image';
                    break;
            }
            type = type.toUpperCase();
            return type;
        }
    }
}