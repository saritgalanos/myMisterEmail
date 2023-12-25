import { Link } from "react-router-dom";
import { Component, useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStar, onRemoveEmail, setIsRead, folder }) {

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

    async function onIsRead() {
        console.log("onIsRead")
        const isReadVal = !emailToPreview.isRead;
        setEmail((prevEmail) => ({ ...prevEmail, isRead: isReadVal }))
        try {
            await setIsRead(emailToPreview.id, isReadVal)
        } catch (err) {
            console.log("error in onStartPreview:" + err)
        }
    }


    const emailReadClass = emailToPreview.isRead ? 'email-read' : 'email-not-read'
    const markLineAsReadClass = emailToPreview.isRead ? 'mark-line-as-read' : ''
    const dateToDisplay = (emailToPreview.dateToDisplay) ? utilService.getDateToDisplay(new Date(emailToPreview.sentAt)):''
    return (

        <div className={`email-preview ${markLineAsReadClass}`}
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>


            <img src={utilService.getIconUrl('starred', emailToPreview.isStarred)} className="icon"
                onClick={() => onStarPreview()} />

            <Link to={`${folder}/${emailToPreview.id}`} className="email-line">
                <div className={`from ${emailReadClass}`}>{emailToPreview.from}</div>
                <div className="main-data">
                    <span className={`subject ${emailReadClass}`}> {emailToPreview.subject} </span>
                    <span className="body"> {emailToPreview.body} </span>
                </div>

            </Link>
            {!isMouseOn &&
                <div className={`email-preview-sent-at ${emailReadClass}`}> 
                    {dateToDisplay}
                </div>}
            {isMouseOn &&
                <div className='control-icons'>
                    <div>
                        <img className="icon" onClick={() => { onRemoveEmail(emailToPreview.id) }} src={utilService.getIconUrl('trash', false)} />
                    </div>
                    <div>
                        <img className="icon" src={utilService.getIconUrl('mail', emailToPreview.isRead)} onClick={() => { onIsRead() }} />
                    </div>
                </div>

            }

        </div>
    )
}
