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
    `
}