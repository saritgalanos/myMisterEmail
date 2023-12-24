import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { EmailFilter } from "../cmps/EmailFilter"
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AppHeader } from "../cmps/AppHeader"



export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(0)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setSearchParams(filterBy)
        loadEmails()
    }, [filterBy])


    async function loadEmails() {

        const emails = await emailService.query(filterBy)
        setEmails(emails)

    }

    function updateUnreadCount(email, changeBy) {
        if (email.to === emailService.getLoggedinUserEmail()) {
            emailService.updateUnreadCount(changeBy)
            console.log('updating unread count')
            setUnreadCount(emailService.getUnreadCount())

        }
    }
    async function onRemoveEmail(emailId) {
        /*if email does not have a removeAt add one and finish. if it does, remove completely*/
        try {
            const email = await emailService.getById(emailId)
            if (!email.removedAt) {
                console.log('on removedAt')
                email.removedAt = Date.now()
                console.log('email.removedAt ' + email.removedAt)
                if (!email.isRead) {
                    updateUnreadCount(email, -1)
                }
                const savedEmail = await emailService.save(email)
                setEmails((prevEmails) => (prevEmails.map((emailInDB) => (emailInDB.id === savedEmail.id) ? savedEmail : emailInDB)))
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
            }
            else {  /*remove completely*/
                await emailService.remove(emailId)
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
            }
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, sortBy: filterBy.sortBy, isRead: filterBy.isRead }));
    }

    function onSetEmailStatus(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, emailStatus: filterBy.emailStatus }));

    }

    async function onStar(emailId) {
        try {
            const email = await emailService.getById(emailId)
            email.isStarred = !email.isStarred
            const savedEmail = await emailService.save(email)
            setEmails((prevEmails) => (prevEmails.map((emailInDB) => (emailInDB.id === savedEmail.id) ? savedEmail : emailInDB)))
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function setIsRead(emailId, isRead) {
        try {
            const email = await emailService.getById(emailId)
            email.isRead = isRead
            isRead ? updateUnreadCount(email, -1) : updateUnreadCount(email, 1)
            const savedEmail = await emailService.save(email)
            setEmails((prevEmails) => (prevEmails.map((emailInDB) => (emailInDB.id === savedEmail.id) ? savedEmail : emailInDB)))
        } catch (error) {
            console.log('error:', error)
        }
    }

    function openComposeModal() {
        navigate('/mail/compose')
    }

    // function closeComposeModal() {
    //     navigate('/mail')
    // }

    function handleSearchSubmit(filterBy) {
        console.log("search by:" + filterBy.txt)
        setFilterBy(prevFilter => ({ ...prevFilter, txt: filterBy.txt }))
    }

    async function onSendEmail(email) {
        try {
            await emailService.save(email)
        } catch (err) {
            console.log("EmailCompose error on onSendEmail:" + err)
        }
        loadEmails()

    }

    async function onSaveToDraft(email) {
        //if to,body  and subject are not set, return original email
        if (!email.to && !email.body && !email.subject) {

            return email
        }
        console.log("saving draft...")
        try {
            console.log("adding draft to db:")
            const newEmail = await emailService.save(email)
            loadEmails()
            return newEmail
        } catch (err) {
            console.log("EmailCompose error on onSendEmail:" + err)
        }

    }


    const { emailStatus, isRead, sortBy, txt } = filterBy
    if (!emails) return <div>Loading...</div>

    return (
        <section className="main-app">
            <header className="app-header"><AppHeader filterBy={{ txt }} handleSearchSubmit={handleSearchSubmit} /></header>
            <aside className="app-side"><EmailFolderList onCompose={openComposeModal} filterBy={{ emailStatus }} onSetEmailStatus={onSetEmailStatus} /></aside>
            <section className="email-index">
                <div className='main-filter'>
                    <EmailFilter filterBy={{ isRead, sortBy }} onSetFilter={onSetFilter} />
                </div>
                {(params.folder || !params) &&
                    <div className='main-content'>
                        <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onStar={onStar} setIsRead={setIsRead} />
                    </div>}


            </section>
            {params.emailId &&
                <Outlet context={{ onStar, onRemoveEmail, setIsRead, onSendEmail, onSaveToDraft }} />}
        </section>
    )

}
