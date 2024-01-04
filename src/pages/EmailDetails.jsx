import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams, Outlet } from "react-router"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"


export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const { onStar, onRemoveEmail, setIsRead, onBackToIndex, onCloseCompose, onSendEmail, onSaveToDraft} = useOutletContext()
    const params = useParams()

    const navigate = useNavigate()
    
    useEffect(() => {
        if (params.emailId) {
            loadEmail()
        }
    }, [params.emailId])


    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            
            await setIsRead(email.id, true)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onTrash(emailId) {
        try {
            await onRemoveEmail(emailId)
            navigate(`/mail/${params.folder}`)
        } catch (err) {
            console.log('onTrash error:', err);
        }
    }

    async function onMarkUnread(emailId) {
        try {
            await setIsRead(emailId, false)
            navigate(`/mail/${params.folder}`)
        } catch (err) {
            console.log('onMarkUnread error:', err);
        }
    }

    async function onStarInDetails(emailId) {
        try {
            const isStarred = !email.isStarred
            setEmail((prevEmail) => ({ ...prevEmail, isStarred: isStarred }))
            await onStar(emailId)
        } catch (err) {
            console.log('onStarInDetails error:', err);
        }
    }
    if (!params.emailId) return <></>
    if (!email) return <div>Loading Email Details...</div>


    return (
        <div className="email-details">
            <div className="email-content">
                <div className="icons-list">
                    <div className="circle-icon"> <img className="icon " onClick={onBackToIndex} src={utilService.getIconUrl('back', false)} /></div>
                    <div className="circle-icon"> <img className="icon " onClick={() => { onTrash(email.id) }} src={utilService.getIconUrl('trash', false)} /></div>
                    <div className="circle-icon"> <img className="icon " onClick={() => { onMarkUnread(email.id) }} src={utilService.getIconUrl('mail', true)} /></div>

                </div>
                <div className="email-subject"> {email.subject}</div>
                <div className="email-specifics">

                    <div><strong>from: {email.from}</strong></div>
                    <div className="email-date">{utilService.getDateToDisplay(new Date(email.sentAt), true)}</div>
                    <img className="icon" onClick={() => onStarInDetails(email.id)} src={utilService.getIconUrl('starred', email.isStarred)} />
                </div>
                <div className="email-to">to: {email.to}</div>

                <br></br>
                <div className="body-area">
                    <div className="email-body">{email.body}</div>
                </div>
            </div>
            <Outlet context={{ onCloseCompose, onSendEmail, onSaveToDraft }} />
        </div>
    )
}