import navModal from './nav-modal.cmp.js';
export default {
    template: `
            <header class="header-container">
                <div class="top-header main-layout">
                    <div class="logo">
                        <h1>AppSus</h1>
                    </div>
                    <nav>
                        <img src="./img/main-img/nav-img.png" @click="toggleNavModal"> 
                    </nav>
                </div>
                <nav-modal v-if="isOpen" @toggleNavModal="toggleNavModal"/>
            </header>
    `,
    data() {
        return {
            isOpen: false
        }
    },
    components: {
        navModal
    },
    methods: {
        toggleNavModal() {
            this.isOpen = !this.isOpen
        }
    }
}