import { useEffect, useRef, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { emailService } from "../services/email.service"

export function EmailCompose() {
    const navigate = useNavigate()
    const [email, setEmail] = useState(emailService.createEmail(undefined, undefined, undefined, undefined, emailService.getLoggedinUserEmail(), undefined))
    const { onSendEmail, onSaveToDraft } = useOutletContext()
    const timeoutRef = useRef()
    const params = useParams()

    useEffect(() => {
        if (timeoutRef.current) {
            // console.log("clearing timeout")
            clearTimeout(timeoutRef.current);
        }
        // console.log("setting timeout")
        timeoutRef.current = setTimeout(() => onSaveDraft(email),5000)

    }, [email]);

    async function onSaveDraft(email) {
        console.log('Timer expired! saving draft');
        
        const newEmail = await onSaveToDraft(email)
        // console.log(`in onSaveDraft: to:${newEmail.to} subject:${newEmail.subject} body:${newEmail.body} id:${newEmail.id}`)
        
        if(!email.id) {
            setEmail(newEmail)
        }

    }

    function onSendComposedEmail(event) {
        event.preventDefault();
        if (!email.to) {
            alert('ERROR - Please specify at least one recipient.');
            return;
        }
        email.sentAt = Date.now()
        onSendEmail(email)
        navigate(`/mail/${params.folder}`)
    }



    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        // console.log(`in handleChange: value=${value} name=${field} type=${type}`)
        value = type === 'number' ? +value : value
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }


    return (
        <div className="email-Compose">

            <div className="modal-content">
                <div className="compose-header">New Message</div>
                <span className="close-btn compose-header" onClick={() => navigate(`/mail/${params.folder}`)}>X</span>

                <form onSubmit={onSendComposedEmail} className="email-compose-form">

                    <div className='input-field'>
                        <label htmlFor="to"></label>
                        <input value={email.to} type="text" id="to" name="to"
                            onChange={handleChange}
                            placeholder="To"
                        />
                    </div>

                    <div className='input-field'>
                        <label htmlFor="subject"></label>
                        <input value={email.subject}
                            type="text" id="subject" name="subject" placeholder="Subject"
                            onChange={handleChange}

                        /></div>
                    <div className='input-body'>
                        <label htmlFor="body" >    </label>
                        <textarea
                            id="body"
                            name="body"
                            value={email.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className='send-button'>Send</button>
                    </div>

                </form>

            </div >
        </div >
    )
}
