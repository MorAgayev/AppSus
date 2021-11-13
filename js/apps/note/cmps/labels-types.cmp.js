
export default {
    props: ['type'],
    template: `
        <h3 @click="filterByLabel" class="label" :class="selectedColor">{{labelsToShow}}</h3>
    `,
    data() {
        return {
            isSelected: false
        }
    },
    methods: {
        filterByLabel() {
            this.$emit('labelClicked', this.type)
            this.isSelected = true;
            setTimeout(() => { this.isSelected = false }, 1000);
        }
    },
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
        },
        selectedColor() {
            return { selected: this.isSelected }
        }
    }
}