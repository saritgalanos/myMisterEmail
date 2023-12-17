import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter
}

const email = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    removedAt: null, //for later use from: 'momo@momo.com', to: 'user@appsus.com'
    from: 'momo@momo.com',
    to: 'saritgalanos@misteremail.com'
}

const loggedinUser = {
    email: 'saritgalanos@mistermail.com',
    fullname: 'Sarit Galanos'
}


const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { txt, emailStatus, isRead, sortBy } = filterBy
        emails = emails.filter(email => email.body.toLowerCase().includes(txt.toLowerCase())
            || email.subject.toLowerCase().includes(txt.toLowerCase()))

        if (isRead === 'Read' || isRead === 'Unread') {
            const isReadFilter = (isRead === 'Read') ? true : false
            emails = emails.filter(email => (email.isRead === isReadFilter))
        }
        if (sortBy != '') {
            var sortedEmails
            switch (sortBy) {

                case 'dateAsc':
                    sortedEmails = [...emails].sort((a, b) => a.sentAt - b.sentAt)
                    break
                case 'dateDes':
                    sortedEmails = [...emails].sort((a, b) => b.sentAt - a.sentAt);
                    break
                case 'subjectAsc':
                    sortedEmails = [...emails].sort((a, b) => a.subject > b.subject ? 1 : -1);
                    break
                case 'subjectDes':
                    sortedEmails = [...emails].sort((a, b) => a.subject > b.subject ? -1 : 1);
                    break
            }
            return sortedEmails;
        }

        return emails
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', sentAt = 0, removedAt = null, from = "", to = "") {
    return {
        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt,
        removedAt,
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        emaiStatus: '',
        txt: '',
        isRead: '',
        sortBy: ''
    }
}



function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)

    if (!emails || !emails.length) {

        const emailBodylong = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

        emails = [
            {
                id: 'e101', subject: 'Plans for tomorrow', body: emailBodylong,
                isRead: false, isStarred: false, sentAt: 1651133930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e102', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1702233930594, removedAt: null,
                from: 'daniel@momo.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e103', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701933930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },

            {
                id: 'e104', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1701283930594, removedAt: null,
                from: 'dan@momo.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e105', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701833930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e106', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1701133930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@misteremail.com'
            },


            {
                id: 'e107', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1702133930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e108', subject: 'Plans for tomorrow', body: emailBodylong,
                isRead: false, isStarred: false, sentAt: 1651133930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e109', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1702233930594, removedAt: null,
                from: 'daniel@momo.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e110', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701933930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },

            {
                id: 'e111', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1701283930594, removedAt: null,
                from: 'dan@momo.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e112', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701833955594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            },
            {
                id: 'e113', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1701663930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@misteremail.com'
            },


            {
                id: 'e114', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1707733930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@misteremail.com'
            },


            {
                id: 'e115', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1702233330594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@misteremail.com'
            }

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

