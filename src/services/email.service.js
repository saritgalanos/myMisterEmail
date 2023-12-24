import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams,
    getFolders,
    getLoggedinUserEmail,
    updateUnreadCount,
    getUnreadCount
}

const folders = [
    { name: 'inbox', label: 'Inbox', count: 0 },
    { name: 'starred', label: 'Starred', count: 0 },
    { name: 'sent', label: 'Sent', count: 0 },
    { name: 'draft', label: 'Draft', count: 0 },
    { name: 'trash', label: 'Trash', count: 0 },
]

function getFolders() {
    return folders
}
function getUnreadCount() {
    return folders[0].count  //returns the unread count in Inbox
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

function getLoggedinUserEmail() {
    return loggedinUser.email
}

const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    setUnreadCount(emails)
    if (filterBy) {
        var { txt, emailStatus, isRead, sortBy } = filterBy

        emails = emails.filter(email => {
            return (email.body &&
                ((email.body.toLowerCase().includes(txt.toLowerCase()))
                    || (email.subject.toLowerCase().includes(txt.toLowerCase()))))

        })

        if (isRead === 'Read' || isRead === 'Unread') {
            const isReadFilter = (isRead === 'Read') ? true : false
            emails = emails.filter(email => (email.isRead === isReadFilter))
        }
        if (emailStatus) {
            switch (emailStatus) {
                case 'inbox':
                    emails = emails.filter(email => ((email.to === loggedinUser.email) && (!email.removedAt)))
                    break
                case 'sent':
                    emails = emails.filter(email => ((email.from === loggedinUser.email) && (!email.removedAt)))
                    break
                case 'trash':
                    console.log('in trash')
                    emails = emails.filter(email => (email.removedAt != null))
                    break
                case 'starred':
                    emails = emails.filter(email => (email.isStarred && (!email.removedAt)))
                    break
                case 'draft':
                    emails = emails.filter(email => (!email.sentAt && (!email.removedAt)))
                    break;
            }
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
        isStarred: false, /*if available than in star*/
        sentAt, /*if available than in sent (can be used for both inbox and sent)*/
        removedAt, /*if available than in trash*/
        from: from, /*if current user than sent*/
        to /*if current user than inbox*/
    }
}

function getDefaultFilter() {
    return {
        emailStatus: 'inbox',
        txt: '',
        isRead: '',
        sortBy: ''
    }
}


function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function logFilter(filterBy) {
    console.log(`logFilter - filterBy: filterBy:emailStatus: ${filterBy.emailStatus}`)
}

function logEmail() {
    console.log(`email.to:${email.to} 
                email.from:${email.from} 
                email.isRead:${email.isRead}`)
}

function setUnreadCount(emails) {
    folders[0].count = 0
    emails.map((email) => {
        /*inbox unread*/
        if ((email.to === loggedinUser.email) && (!email.removedAt) && !email.isRead) {
            folders[0].count++
        }
    })
}

function updateUnreadCount(changeBy) {
    folders[0].count = folders[0].count + changeBy
}


function resetEmailCount() {
    folders.map(folder => folder.count = 0)
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
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e102', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1702233930594, removedAt: null,
                from: 'daniel@momo.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e103', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701933930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            },

            {
                id: 'e104', subject: 'Highly customizable design assets', body: 'Welcome to the largest Design Asset Ecosystem:assets, Integrations, and Motion',
                isRead: false, isStarred: false, sentAt: 1701283930594, removedAt: null,
                from: 'dan@momo.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e105', subject: `[Update] Changes to the Google Cloud Third-Party Subprocessors list`,
                body: `Dear Sarit,
               We are writing to let you know about the following updates to the Third-Party Subprocessors we engage for Google Cloud:
               We are adding the following entities to perform Technical Support for Transfer Appliance:
               HCL Japan Ltd.
               HCL Technologies Philippines, Inc.
               HCL Technologies Limited
               We are removing the following entities from the Google Distributed Cloud Edge Appliance Service:
               HCL America, Inc.
               HCL TECHNOLOGIES MÉXICO S. DE R.L. DE C.V.
               HCL Poland SP. Z.o.o.
               We are removing PVP Inc from performing Technical Support to All Google Cloud Platform Services.
               No action is required on your part.`,
                isRead: false, isStarred: false, sentAt: 1701833930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e106', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1701133930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@mistermail.com'
            },


            {
                id: 'e107', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1702133930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e108', subject: 'Plans for tomorrow', body: emailBodylong,
                isRead: false, isStarred: false, sentAt: 1651133930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e109', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1702233930594, removedAt: null,
                from: 'daniel@momo.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e110', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701933930594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            },

            {
                id: 'e111', subject: 'Your yearly bonus', body: 'It is time for your yearly bonus, please come to my office',
                isRead: false, isStarred: false, sentAt: 1701283930594, removedAt: null,
                from: 'dan@momo.com', to: 'saritgalanos@mistermail.com'
            },
            {
                id: 'e112', subject: 'This email should be in the sent directory', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1701833955594, removedAt: null,
                from: 'saritgalanos@mistermail.com', to: 'sarit@gmail.com'
            },
            {
                id: 'e113', subject: 'This email should be in the sent directory, This email should be in the sent directory', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1701663930594, removedAt: null,
                from: 'saritgalanos@mistermail.com', to: 'roni@gmail.com'
            },


            {
                id: 'e114', subject: 'My next vacation', body: 'I would like to take a vacation for Christmas ',
                isRead: false, isStarred: false, sentAt: 1707733930594, removedAt: null,
                from: 'shiri@momo.com', to: 'saritgalanos@mistermail.com'
            },


            {
                id: 'e115', subject: 'Plans for tomorrow', body: 'emailBodylong',
                isRead: false, isStarred: false, sentAt: 1702233330594, removedAt: null,
                from: 'roni@gmail.com', to: 'saritgalanos@mistermail.com'
            }

        ]

        /*setting initial count regardless of filter*/
        setUnreadCount(emails)
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}
