import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useSearchParams, useOutletContext } from "react-router-dom"
// import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router"
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service"

export function EmailCompose() {
    const navigate = useNavigate()
    const [email, setEmail] = useState(emailService.createEmptyEmail(undefined, undefined, undefined, undefined, emailService.getLoggedinUserEmail(), undefined, true))
    const [modalState, setModalState] = useState('normal')
    const timeoutRef = useRef()
    const params = useParams()
   const { onCloseCompose, onSendEmail, onSaveToDraft } = useOutletContext()
    const [searchParams, setSearchParams] = useSearchParams();

        useEffect(() => {
        loadEmailToEdit()
    }, [])

    async function loadEmailToEdit() {
        /*help email*/
        const searchParamsTo = searchParams.get('to')
        const searchParamsSubject = searchParams.get('subject')
        if (searchParamsTo && searchParamsSubject) {
            setEmail((prevEmail) => ({ ...prevEmail, to: searchParamsTo, subject: searchParamsSubject }))
        }

        if (params.emailIdToEdit) {
            const emailToEdit = await emailService.getById(params.emailIdToEdit)
            setEmail(emailToEdit)
        }
    }


    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        console.log("setting timeout")
        timeoutRef.current = setTimeout(() => onSaveDraft(email), 5000)

    }, [email]);

    async function onSaveDraft(email) {
        console.log('Timer expired! saving draft');
        /*add sentAt */
        if (!email.sentAt) {
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
       
        await onSaveToDraft(email)
        if (timeoutRef.current) {
            console.log("clearing timeout")
            clearTimeout(timeoutRef.current);
        }
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
        (modalState == 'normal') ? minimizeModal() : setModalState('normal')
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
                    <div><img className="icon minimize" onClick={minimizeModal} src={utilService.getIconUrl('minimize', false)} /> </div>
                    <div><img className="icon full" onClick={fullscreenModal} src={utilService.getIconUrl('fullscreen', false)} /> </div>
                    <div><img className="icon" onClick={onCloseComposeModal} src={utilService.getIconUrl('close', false)} /></div>
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
                        <button className='btn-send'>Send</button>
                    </div>

                </form>

            </div >
        </div>
    )
}