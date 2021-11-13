import {
    storageService
} from '../../../services/async-storage-service.js'
import {
    utilService
} from '../../../services/util-service.js'

const EMAILS_KEY = 'Emails';
createEmails();

export const emailService = {
    queryAllEmails,
    UpdateCriteria,
    addEmail,
    createEmails,
    createEmail,
    getById,
    removeEmail,
    removeAt,
    putEmail,
    sendToNotes
}

const gCriteria = {
    status: 'inbox',
    isRead: false, // (optional property, if missing: show all)
    isStared: false, // (optional property, if missing: show all)
    // subject: '', // no need to support complex text search
    // lables: ['important', 'romantic'] // has any of the labels
}

function sendToNotes(email) {
    const note = {
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: 
                `from: ${email.name}, ${'\n'} to: ${email.to}, \n subject:${email.subject}, \n body:${email.body}`          
        },
        style: {
            backgroundColor: 'lightblue',
            padding: '10px'
        }
    }
    storageService.post('notes', note);
}

function removeAt(id) {
    getById(id)
        .then(email => _updateEmailStatus(email, 'trash'))
        .then(email => putEmail(email))
}

function _updateEmailStatus(email, status) {
    email.status = status
    return email
}

function removeEmail(id) {
    return storageService.remove(EMAILS_KEY, id)
}

function putEmail(updatedEntity) {
    return storageService.put(EMAILS_KEY, updatedEntity)
}

function getById(id) {
    return storageService.get(EMAILS_KEY, id);
}

function addEmail(email) {
    const newEmail = createEmail(email.name, email.subject, email.body, email.status, email.to)
    return storageService.post(EMAILS_KEY, newEmail)
}

function UpdateCriteria(type, val) {
    for (var key in gCriteria) {
        if (key === type) gCriteria[type] = val
    }
}

function queryAllEmails() {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            return emails.filter(email => {
                for (var key in gCriteria) {
                    if ((!email[key] || email[key] != gCriteria[key])) return false
                    if (gCriteria.isRead && gCriteria.isRead != email.isRead) return false
                    if (gCriteria.isStared === email.isStared) return true
                    else return true
                }
            })

        })
}

function createEmails() {
    const emails = [
        createEmail('Ben', 'Miss you!', 'Would love to catch up sometimes'),
        createEmail('Mor', 'Trip plan', 'Hi this is our trip plan.Hope you like :)'),
        createEmail('Popo', 'Order Confirmation', 'Please confirm your order'),
        createEmail('Momo', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!'),
        createEmail('Shoko', 'Hello VUE', 'Hello, I\'m VUE nice to meet!')
    ]
    utilService.saveToStorage(EMAILS_KEY, emails)
    return emails
}

function createEmail(name='', subject='', body='', status = 'inbox', to = 'momo@momo.com') {
    return {
        id: _makeEmailId(),
        name,
        subject,
        body,
        isRead: false,
        isStared: false,
        sentAt: Date.now(),
        to,
        status
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