import { Link } from "react-router-dom";
import { Component, useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStar, onRemoveEmail, setIsRead }) {

    const [emailToPreview, setEmail] = useState(email)

   
    const [isMouseOn, setMouseOn] = useState(false)

    async function onStarPreview() {
        const isStarredVal = !emailToPreview.isStarred;
        setEmail((prevEmail) => ({ ...prevEmail, isStarred: isStarredVal }))
        try {
            await onStar(emailToPreview.id)
        } catch (err) {
            console.log("error in onStartPreview:" + err)
        }
    }

    const emailReadClass = emailToPreview.isRead ? 'email-read' : 'email-not-read'
    const markLineAsReadClass = emailToPreview.isRead ? 'mark-line-as-read' : ''
    return (

        <div className={`email-preview ${markLineAsReadClass}`}
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>


            <img className="icon preview-star" onClick={() => onStarPreview()} src={utilService.getIconUrl('star', emailToPreview.isStarred)} />
            <Link  to={`${emailToPreview.id}`} className="email-line">
                <div className={`email-preview-from ${emailReadClass}`}>{emailToPreview.from}</div>
                <div className="main-data">
                    <span className={`email-preview-subject ${emailReadClass}`}> {emailToPreview.subject} </span>
                    <span className="email-preview-body"> {emailToPreview.body} </span>
                </div>

            </Link>
            {!isMouseOn && <div className={`email-preview-sent-at ${emailReadClass}`}>{utilService.getDateToDisplay(new Date(emailToPreview.sentAt))}</div>}
            {isMouseOn &&
                <div className='control-icons'>
                    <div><img className="icon" onClick={() => { onRemoveEmail(emailToPreview.id) }} src={utilService.getIconUrl('trash', false)} /></div>
                    <div><img className="icon" onClick={() => { }} src={utilService.getIconUrl('unread', false)} /></div>
                </div>

            }

        </div>
    )
}
