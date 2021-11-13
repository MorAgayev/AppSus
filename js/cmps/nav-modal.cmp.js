export default {
    name: 'nav-modal', 
    template: `
        <nav class="nav-modal">
            <div @click="toEmailApp">
                <i class="fa fa-envelope fa-3x"></i>
                <div>Email</div>
            </div>
            <div @click="toNotesApp">
                <i class="fa fa-map-pin fa-3x"></i>
                <div>Notes</div>
            </div>
        </nav>
    `,
    data() {
        return {
            isOpen: false
        }
    }, 
    methods: {
        toEmailApp() {
            this.$router.push('/email')
            this.toggleNavModal()
        },
        
        toNotesApp() {
            this.$router.push('/note')
            this.toggleNavModal()
        },
        
        toggleNavModal() {
            this.$emit('toggleNavModal')
        }

    }

}