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
            navigate('/mail')
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
            <div className="email-content">
                <div className="icons-list">
                   <div className="circle-icon"> <img className="icon " onClick={() => navigate('/mail')} src={utilService.getIconUrl('back', false)} /></div>
                   <div className="circle-icon"> <img className="icon " onClick={() => { onRemoveEmail(email.id) }} src={utilService.getIconUrl('trash', false)} /></div>

                </div>
                <div className="email-subject"> {email.subject}</div>
                <div className="email-specifics">

                    <div><strong>from: {email.from}</strong></div>
                    <div className="email-date">{utilService.getDateToDisplay(new Date(email.sentAt), true)}</div>
                    <img className="icon" onClick={() => { }} src={utilService.getIconUrl('star', email.isStarred)} />
                </div>
                <div className="email-to">to: {email.to}</div>

                <br></br>
                <div className="body-area">
                    <div className="email-body">{email.body}</div>
                </div>
            </div>
        </div>
    )
}