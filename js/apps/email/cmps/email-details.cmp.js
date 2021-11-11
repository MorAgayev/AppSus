// import { emailService } from '../service/email.service.js'
export default {
    props:['email'], 
    template: `
        <article class="email-details">
            <button>X</button>
            <div class="top-details">
                <h4>{{email.name}}</h4>
                <small>{{email.to}}</small>
                <p>{{email.sentAt}}</p>
            </div>
            <div class="details-body">
                <p>{{email.body}}</p>
            </div>
        </article>
    `, 
    // watch: {
    //     heandler() {
           
        //     emailService.getById(email.id)
        //     .then(email => {
        //         if (email) {
        //             email.isRead = !email.isRead
        //             emailService.putEmail(email)
        //         } 
        //         else {
        //             emailService.getSentById(email.id)
        //             .then(email => {
        //                 email.isRead = !email.isRead
        //                 emailService.putSent(email)
        //             })
        //         } 
        //     })
        // }
        
    // }
}