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


    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
         setFilterBy(prevFilter => ({ ...prevFilter, sortBy: filterBy.sortBy, isRead: filterBy.isRead }));
    }

    async function onStar(emailId) {
        try {
            const email = await emailService.getById(emailId)
            email.isStarred = !email.isStarred
            emailService.save(email)

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
        console.log("search by:"+filterBy.txt)
        setFilterBy(prevFilter => ({ ...prevFilter, txt:filterBy.txt }))
    }

    const {isRead, sortBy ,txt} = filterBy
    if (!emails) return <div>Loading...</div>

    return (
        <section className="main-app">
            <header className="app-header"><AppHeader filterBy={{txt}} handleSearchSubmit={handleSearchSubmit} /></header>
            <aside className="app-side"><EmailFolderList onCompose={openComposeModal} /></aside>
           {!params.emailId && <section className="email-index">
                <div className='main-filter'>
                    <EmailFilter filterBy={{isRead, sortBy }} onSetFilter={onSetFilter} />
                </div>
                <div className='main-content'>
                    <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onStar={onStar}  />
                </div>
            </section>}
            <Outlet />
        </section>
    )

}
