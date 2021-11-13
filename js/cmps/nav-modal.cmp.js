export default {
    name: 'nav-modal', 
    template: `
        <nav class="nav-modal">
            <div @click="toHomeApp">
                <i class="fa fa-home fa-3x"></i>
                <div>Home</div>
            </div>
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
        toHomeApp() {
            // if()/
            // console.log(this.$router.history.current.fullPath);
            if(this.$router.history.current.fullPath === '/') {
                this.toggleNavModal()
                return
            }
            this.$router.push('/')
            this.toggleNavModal()
        },

        toEmailApp() {
            if(this.$router.history.current.fullPath === '/email') {
                this.toggleNavModal()
                return
            }
            this.$router.push('/email')
            this.toggleNavModal()
        },
        
        toNotesApp() {
            if(this.$router.history.current.fullPath === '/note') {
                this.toggleNavModal()
                return
            }
            this.$router.push('/note')
            this.toggleNavModal()
        },
        
        toggleNavModal() {
            this.$emit('toggleNavModal')
        }

    }

}