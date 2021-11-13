import { emailService } from "../service/email.service.js"
import emailList from "../cmps/email-list.cmp.js"
import emailFilter from "../cmps/email-filter.cmp.js"
import emailSearch from "../cmps/email-search.cmp.js"
import emailNew from "../cmps/email-new.cmp.js"
// import userMsg from "../../../cmps/user-msg.cmp.js"
export default {
    name: 'email-app',

    template: `
        <section class="email-app">
            <div class="main-grid">
                <email-filter :unreadEmails="unreadEmails" @filterd="filtering" @OpenNewEmail="toggleNewEmail"/>
                <email-search @filterBy='setSearch' @sort="setSort" @setIsRead="setIsRead" />
                <email-list :emails="emailsToShow" @changeRead="changeRead" @changeStared="changeStared" @removeEmail="removeEmail"/> 
            </div>
            <email-new v-if="isNewEmail" @sendEmail="addEmail" @closeModal="addEmail" />
          
        </section>
    `,

    data() {
        return {  
            emails: null,
            isNewEmail: false,
            filterSearch: null,
            unreadEmails: 0
        }
    },
    created() {
        this.loadEmails()
    },

    components: {
        emailList,
        emailFilter,
        emailSearch,
        emailNew
    },

    methods: {
        loadEmails() {
           return emailService.queryAllEmails()
                .then(emails => this.emails = emails)
                .then(this.setUnreadEmails)
        },
        
        filtering(val) {
            emailService.UpdateCriteria('status', val)
            this.loadEmails()
        },

        toggleNewEmail() {
            this.isNewEmail = !this.isNewEmail
        }, 

        addEmail(email) {
            emailService.addEmail(email)
                .then(this.loadEmails)
            this.toggleNewEmail()
        }, 

        setSearch(val) {
            this.filterSearch = val
        },

        setSort(val) {
            if(!val) return this.emails;
            if(val === 'SUBJECT') {
                this.emails.sort((a , b) => {return (a.subject > b.subject) ? 1 : -1})
            } else {
                this.emails.sort((a , b) => {return (a.sentAt > b.sentAt) ? 1 : -1})
            }
        }, 

        setIsRead(val) {
            if(val === 'READ') emailService.UpdateCriteria('isRead', true)
            if(val === 'UNREAD') emailService.UpdateCriteria('isRead', false)
            // if(val === 'STARRED') emailService.UpdateCriteria('isStared', true)
            // if(val === 'UNSTARRED') emailService.UpdateCriteria('isStared', false)
            this.loadEmails()
        }, 

        setUnreadEmails() {
            let count = 0
            emailService.queryAllEmails()
                .then(emails => {
                    emails.forEach(email => {
                        if(email.status === 'inbox') {
                            if (!email.isRead)
                            count++
                        }
                    });
                    this.unreadEmails = count
                })
            // this.emails.forEach(email => {
            //     if(email.status === 'inbox') {
            //         if (!email.isRead)
            //         count++
            //     }
            // });
            // this.unreadEmails = count
        },

        changeRead(id) {
            emailService.getById(id)
                .then(email=> {
                    email.isRead = !email.isRead
                    return emailService.putEmail(email)
                })
                .then(this.loadEmails)
            this.setUnreadEmails()
        }, 

        changeStared(id) {
            emailService.getById(id)
            .then(email=> {
                email.isStared = !email.isStared
                return emailService.putEmail(email)
            })
            .then(this.loadEmails)
        }, 

        removeEmail(id) {
            emailService.getById(id)
                .then(email=> {
                    if(email.status === 'trash') emailService.removeEmail(id)
                    else emailService.removeAt(id)
                })
                .then(this.loadEmails)

        }
    },
    
    computed: {
        emailsToShow() {
            if(this.isSentEmail)  this.showSentEmails() 
            if (!this.filterSearch) return this.emails;
            const searchStr = this.filterSearch.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
                return email.name.toLowerCase().includes(searchStr) ||
                    email.subject.toLowerCase().includes(searchStr)
            });
            return emailsToShow;
        },
        
    }
}