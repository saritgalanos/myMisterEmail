import { useEffect, useRef, useState } from "react"
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"

export function EmailCompose({ emailIdToEdit, onCloseCompose, onSendEmail, onSaveToDraft }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState(emailService.createEmail(undefined, undefined, undefined, undefined, emailService.getLoggedinUserEmail(), undefined, true))
    const [modalState, setModalState] = useState('normal')
    const timeoutRef = useRef()
    const params = useParams()

    useEffect(() => {
        loadEmailToEdit()
    }, [])

    async function loadEmailToEdit() {
        console.log('emailIdToEdit:' + emailIdToEdit)
        if (emailIdToEdit !== 'new') {
            const emailToEdit = await emailService.getById(emailIdToEdit)
            setEmail(emailToEdit)
        }
    }


    useEffect(() => {
        if (timeoutRef.current) {
            console.log("clearing timeout")
            clearTimeout(timeoutRef.current);
        }
        console.log("setting timeout")
        timeoutRef.current = setTimeout(() => onSaveDraft(email), 5000)

    }, [email]);

    async function onSaveDraft(email) {
        console.log('Timer expired! saving draft');
        /*add sentAt */
        if(!email.sentAt) {
            email.sentAt = Date.now()
        }
        const newEmail = await onSaveToDraft(email)
        // console.log(`in onSaveDraft: to:${newEmail.to} subject:${newEmail.subject} body:${newEmail.body} id:${newEmail.id}`)
        if (!email.id) {
            setEmail(newEmail)
        }

    }

    function onSendComposedEmail(event) {
        event.preventDefault();
        if (!email.to) {
            alert('ERROR - Please specify at least one recipient.')
            return;
        }
        //clear timer
        if (timeoutRef.current) {
            console.log("onSendComposedEmail: clearing timeout")
            clearTimeout(timeoutRef.current);
        }
        email.sentAt = Date.now()
        email.isDraft = false
        onSendEmail(email)
        onCloseCompose()
    }

    async function onCloseComposeModal() {
        /*clear timer, save draft and close */
        if (timeoutRef.current) {
            console.log("clearing timeout")
            clearTimeout(timeoutRef.current);
        }
        await onSaveToDraft(email)
        onCloseCompose()
    }



    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        // console.log(`in handleChange: value=${value} name=${field} type=${type}`)
        value = type === 'number' ? +value : value
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }


    function minimizeModal() {
        (modalState == 'minimized') ? normalizeModal() : setModalState('minimized')
    }

    function normalizeModal() {
        (modalState == 'normal') ? minimizeModal():setModalState('normal')
    }

    function fullscreenModal() {
        (modalState === 'fullscreen') ? normalizeModal() : setModalState('fullscreen')
    }

    const overlay = (modalState == 'fullscreen') ? 'overlay' : ''

    return (
        <div className={`${overlay}`}>
            <div className={`email-compose ${modalState} ${overlay}`}>


                <div className="compose-header">
                    <div onClick={normalizeModal}>New Message</div>
                    <div><img className="icon" onClick={minimizeModal} src={utilService.getIconUrl('minimize', false)} /> </div>
                    <div><img className="icon" onClick={fullscreenModal} src={utilService.getIconUrl('fullscreen', false)} /> </div>
                    <div><img className="icon" onClick={() => { onCloseCompose() }} src={utilService.getIconUrl('close', false)} /></div>
                </div>
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
        </div>
    )
}
