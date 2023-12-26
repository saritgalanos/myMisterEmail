import { Link } from "react-router-dom";
import { useNavigate, useOutletContext, useParams } from "react-router"
import { Component, useEffect, useState } from "react"
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailPreview({ email, onStar, onRemoveEmail, setIsRead ,onCompose}) {

    const [emailToPreview, setEmail] = useState(email)
    const [isMouseOn, setMouseOn] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
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

    function onEmailPreview() {
        if(emailToPreview.isDraft) {
            onCompose(emailToPreview.id)
        }
        else {
            navigate(`/mail/${params.folder}/${emailToPreview.id}`)
        }

    }



    const emailReadClass = emailToPreview.isRead ? 'email-read' : 'email-not-read'
    const markLineAsReadClass = emailToPreview.isRead ? 'mark-line-as-read' : ''
    const dateToDisplay = (emailToPreview.sentAt) ? utilService.getDateToDisplay(new Date(emailToPreview.sentAt)) : ''

    return (

        <div className={`email-preview ${markLineAsReadClass}`}
            onMouseEnter={() => { setMouseOn(true) }}
            onMouseLeave={() => { setMouseOn(false) }}>


            <img src={utilService.getIconUrl('starred', emailToPreview.isStarred)} className="icon"
                onClick={() => onStarPreview()} />

 
            <div className="email-line" onClick={() => {onEmailPreview()}} >
                <div className={`from ${emailReadClass}`}>{emailToPreview.from}</div>
                <div className="main-data">
                    <span className={`subject ${emailReadClass}`}> {emailToPreview.subject} </span>
                    <span className="body"> {emailToPreview.body} </span>
                </div>
            </div>

            {
                !isMouseOn &&
                <div className={`email-preview-sent-at ${emailReadClass}`}>
                    {dateToDisplay}
                </div>
            }
            {
                isMouseOn &&
                <div className='control-icons'>
                    <div>
                        <img className="icon" onClick={() => { onRemoveEmail(emailToPreview.id) }} src={utilService.getIconUrl('trash', false)} />
                    </div>
                    <div>
                        <img className="icon" src={utilService.getIconUrl('mail', emailToPreview.isRead)} onClick={() => { onIsRead() }} />
                    </div>
                </div>

            }

        </div >
    )
}
