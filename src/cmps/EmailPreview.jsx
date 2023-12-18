import { Link } from "react-router-dom";
import { Component, useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStar, onRemoveEmail }) {

    const [isStar, setIsStar] = useState(email.isStarred)

    function OnstarPreview() {
        setIsStar(!isStar)
        onStar(email.id)
    }
    const emailReadClass = email.isRead ? 'email-read' : 'email-not-read'

    return (

        <div className={`email-preview ${emailReadClass}`}>
            {/* <label>
                <input className="preview-checkbox" type="checkbox" value="selected" checked={false} onChange={() => { }} />
            </label> */}
            <img className="icon preview-star" onClick={() => OnstarPreview()} src={utilService.getIconUrl('star', isStar)} />
            <Link className="email-line" to={`${email.id}`}>
                <div className={`email-preview-from ${emailReadClass}`}>{email.from}</div>
                <div className="main-data">
                    <span className={`email-preview-subject ${emailReadClass}`}> {email.subject} </span>
                    <span className="email-preview-body"> {email.body} </span>
                </div>
                <div className={`email-preview-sent-at ${emailReadClass}`}>{utilService.getDateToDisplay(new Date(email.sentAt))}</div>
            </Link>
            <img className="icon preview-trash" onClick={() => { onRemoveEmail(email.id) }} src={utilService.getIconUrl('trash', false)} />

        </div>
    )
}
