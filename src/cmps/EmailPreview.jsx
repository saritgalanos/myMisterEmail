import { Link } from "react-router-dom";
import { Component, useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStar, onRemoveEmail, onRead }) {

    const [isStar, setIsStar] = useState(email.isStarred)
    const [isRead, setIsRead] = useState(email.isRead)
    const [isMouseOn, setMouseOn] = useState(false)

    function onStarPreview() {
        setIsStar(!isStar)
        onStar(email.id)
    }

    const emailReadClass =  email.isRead ? 'email-read' : 'email-not-read'
    const markLineAsReadClass = email.isRead?  'mark-line-as-read' : ''
    return (

        <div className={`email-preview ${markLineAsReadClass}`}
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>
           

            <img className="icon preview-star" onClick={() => onStarPreview()} src={utilService.getIconUrl('star', isStar)} />
            <Link className="email-line" to={`${email.id}`}>
                <div className={`email-preview-from ${emailReadClass}`}>{email.from}</div>
                <div className="main-data">
                    <span className={`email-preview-subject ${emailReadClass}`}> {email.subject} </span>
                    <span className="email-preview-body"> {email.body} </span>
                </div>

            </Link>
            {!isMouseOn && <div className={`email-preview-sent-at ${emailReadClass}`}>{utilService.getDateToDisplay(new Date(email.sentAt))}</div>}
            {isMouseOn &&
                <div className='control-icons'>
                    <div><img className="icon" onClick={() => { onRemoveEmail(email.id) }} src={utilService.getIconUrl('trash', false)} /></div>
                    <div><img className="icon" onClick={() => { }} src={utilService.getIconUrl('unread', false)} /></div>
                </div>

            }

        </div>
    )
}
