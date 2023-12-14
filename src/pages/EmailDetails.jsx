import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"
import { EmailFolderList } from "../cmps/EmailFolderList"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    useEffect(() => {
        setIsRead()
    }, [email])

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            navigate('/')
        } catch (error) {
            console.log('error:', error)
        }
    }


    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
    }
    async function setIsRead() {
        if (!email) {
            return;
        }
        try {
            email.isRead = true;
            await emailService.save(email)
        } catch (error) {
            console.log('error:', error)
        }
    }

    if (!email) return <div>Loading Email Deatils...</div>

    return (
        <div className="email-details">
            {/* <div className="side-content">
                <EmailFolderList />
            </div> */}
            <div className="main-content">
                <div className="email-date">{utilService.getDateToDisplay(new Date(email.sentAt), true)}</div>
                <div className='image-with-text'>
                    <img className="icon" onClick={() => { onRemoveEmail(email.id) }} src={utilService.getIconUrl('trash', false)} />
                    <img className="icon" onClick={() => { }} src={utilService.getIconUrl('star', email.isStarred)} />
                    <div className="email-subject"> {email.subject}</div>
                </div>

                <div><strong>from: {email.from}</strong></div>
                <div>to: {email.to}</div>

                <br></br>

                <div>{email.body}</div>
            </div>
        </div>
    )
}