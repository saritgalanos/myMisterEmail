import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFolderList } from "../cmps/EmailFolderList"
import { EmailFilter } from "../cmps/EmailFilter"
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { IndexHeader } from "../cmps/IndexHeader"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useEffectUpdate } from "../cmps/customHooks/useEffectUpdate"
import { EmailDetails } from "./EmailDetails"
import { EmailCompose } from "../cmps/EmailCompose"



export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(0)
    const [isComposing, setIsComposing] = useState(false)

    const navigate = useNavigate()
    const params = useParams()



    useEffect(() => {
        const existingSearchParams = Object.fromEntries(searchParams.entries())
        // Merge existing parameters with filterBy
        const newSearchParams = { ...existingSearchParams, ...filterBy }
        // Create a new URLSearchParams object with the merged parameters
        const updatedSearchParams = new URLSearchParams(newSearchParams)
        // Update the URL with the new parameters
        setSearchParams(updatedSearchParams)
        loadEmails()
    }, [filterBy])


    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        setEmails(emails)
    }

    function updateUnreadCount(email, changeBy) {
        if (email.to === emailService.getLoggedinUserEmail()) {
            emailService.updateUnreadCount(changeBy)
            setUnreadCount(emailService.getUnreadCount())

        }
    }
    async function onRemoveEmail(emailId) {
        /*if email does not have a removeAt add one and finish. if it does, remove completely*/
        try {
            const email = await emailService.getById(emailId)
            if (!email.removedAt) {
                email.removedAt = Date.now()
                if (!email.isRead) {
                    updateUnreadCount(email, -1)
                }
                const savedEmail = await emailService.save(email)
                showSuccessMsg("Email moved to trash")
                setEmails((prevEmails) => (prevEmails.map((emailInDB) => (emailInDB.id === savedEmail.id) ? savedEmail : emailInDB)))
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
            }
            else {  /*remove completely*/
                await emailService.remove(emailId)
                showSuccessMsg('Email removed successfully')
                setEmails(prevEmails => {
                    return prevEmails.filter(email => email.id !== emailId)
                })
            }
        } catch (error) {
            showErrorMsg(`onRemoveEmail: ${err}`)
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        console.log("setting filter")
        setFilterBy(prevFilter => ({ ...prevFilter, sortBy: filterBy.sortBy, isRead: filterBy.isRead }));
    }

    function onSetSelectedFolder(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, selectedFolder: filterBy.selectedFolder }));

    }

    async function onStar(emailId) {
        try {
            const email = await emailService.getById(emailId)
            email.isStarred = !email.isStarred
            const savedEmail = await emailService.save(email)
            // setEmails((prevEmails) => (prevEmails.map((emailInDB) => (emailInDB.id === savedEmail.id) ? savedEmail : emailInDB)))
        } catch (error) {
            console.log('error:', error)
        } finally {
            loadEmails()
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

    function onCompose(emailId = '') {
                    navigate(`/mail/${filterBy.selectedFolder}/edit`)
        
        // if (params.emailId) {
        //     navigate(`/mail/${filterBy.selectedFolder}/${params.emailId}/edit`)
        // }
        // else {
        //     navigate(`/mail/${filterBy.selectedFolder}/edit`)
        // }
    }

    function onBackToIndex() {
        const urlParams = new URLSearchParams(filterBy).toString()
        navigate(`/mail/${filterBy.selectedFolder}/?${urlParams}`)
    }


    function onCloseCompose() {
        console.log('closing compose modal:' + params)
        // setFilterBy(prevFilter => ({ ...prevFilter, compose: '' }))
        const urlParams = new URLSearchParams(filterBy).toString()
        if (!params.emailId) {
            navigate(`/mail/${filterBy.selectedFolder}/?${urlParams}`)
        }
        else {
            navigate(`/mail/${filterBy.selectedFolder}/${params.emailId}/?${urlParams}`)
        }

    }


    function handleSearchSubmit(filterBy) {
        console.log("search by:" + filterBy.txt)
        setFilterBy(prevFilter => ({ ...prevFilter, txt: filterBy.txt }))
    }

    async function onSendEmail(email) {
        try {
            await emailService.save(email)
            showSuccessMsg('Email sent successfully')
        } catch (err) {
            showErrorMsg(`onSendEmail: ${err}`)
        } finally {
            loadEmails()
        }
    }

    async function onSaveToDraft(email) {
        if (!email || (email && !email.to && !email.subject && !email.body)) {
            console.log("onSaveToDraft: nothing to save...")
            return email
        }

        console.log("onSaveToDraft email:id " + email.id)
        var newEmail
        try {
            console.log("onSaveToDraft: saving draft...")
            newEmail = await emailService.save(email)

        } catch (err) {
            console.log("onSaveToDraft: error " + err)
        }
        finally {
            loadEmails()
            return newEmail
        }

    }

    const folder = !params.folder ? 'inbox' : params.folder
    const { selectedFolder, isRead, sortBy, txt } = filterBy
    if (!emails) return <div>Loading...</div>

console.log("is composing"+isComposing + " params.emailId:" + params.emailId)
    return (
        <section className="main-app">
            <header className="app-header"><IndexHeader filterBy={{ txt }} handleSearchSubmit={handleSearchSubmit} /></header>
            <aside className="app-side"><EmailFolderList onCompose={onCompose} filterBy={{ selectedFolder }} onSetSelectedFolder={onSetSelectedFolder} /></aside>
            {!params.emailId &&
                <section className="email-index">

                    <div className='main-filter'>
                        <EmailFilter filterBy={{ isRead, sortBy }} onSetFilter={onSetFilter} />
                    </div>
                    <div className='main-content'>
                        <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onStar={onStar} setIsRead={setIsRead} onCompose={onCompose} />
                    </div>
                </section>}
            {/* showing first email details */}
            {params.emailId && <Outlet context={{ onStar, onRemoveEmail, setIsRead, onBackToIndex }} />}

            {/* email compose */}
            {!params.emailId && <Outlet context={{ onCloseCompose, onSendEmail, onSaveToDraft }} />}

        </section>
    )
}
