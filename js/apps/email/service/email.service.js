import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

const EMAILS_KEY = 'Emails';
const SEND_EMAIL_KEY = 'SendEmails'
const gEmails = createEmails();

export const emailService = {
    createEmails, 
    createEmail, 
    queryEmails, 
    getById, 
    removeEmail, 
    setToRead, 
    addToSendsEmails
}

function addToSendsEmails(email) {
    // if()
    // createEmail(name,subject, body)
    // console.log(email);
    // storageService.post(SEND_EMAIL_KEY, email)
}

function setToRead(id) {
    getById(id)
        .then(email=> {
            console.log('email', email);
            email.isRead = false;
            storageService.put(EMAILS_KEY, email)
        })
}

function removeEmail(id) {
    return storageService.remove(EMAILS_KEY, id)
}

function getById(id) {
    return storageService.get(EMAILS_KEY, id);
}

function queryEmails() {
    return storageService.query(EMAILS_KEY);
}

function createEmails() {
    const emails = [
        createEmail('Ben','Miss you!', 'Would love to catch up sometimes'),
        createEmail('Mor','Trip plan', 'Hi this is our trip plan.Hope you like :)'),
        createEmail('Popo','Order Confirmation', 'Please confirm your order'),
        createEmail('Momo','Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko','Hello VUE', 'Hello, I\'m VUE nice to meet!')
    ]
    utilService.saveToStorage(EMAILS_KEY, emails)
    return emails
}

function createEmail(name,subject, body) {
    return {
        id: _makeEmailId(),
        name,
        subject,
        body,
        isRead: false,
        sentAt : new Date ,
        to: 'momo@momo.com'
    }
}

function _makeEmailId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }

// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt : 1551133930594,
//     to: 'momo@momo.com'
// }
//filter
// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
//    }
   
    