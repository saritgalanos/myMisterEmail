import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { emailService } from "../services/email.service"

export function EmailCompose() {
    const navigate = useNavigate()
    const [email, setEmail] = useState(emailService.createEmail(undefined, undefined, undefined, undefined, emailService.getLoggedinUserEmail(), undefined))
    const [draftSaved, setDraftSaved] = useState(false)
    const { onSendEmail, onSaveToDraft} = useOutletContext()
    const [timerId, setTimerID] = useState(0)
    const params = useParams()

    useEffect(() => {


        return () => {
            if (timerId) {
                clearTimeout(timerId);
                console.log('timer cleared')
            }
        }
    }, []);

    useEffect(() => {
        console.log(`in useEffect: to:${email.to} subject:${email.subject} body:${email.body} id:${email.id}`)
        if (!email.body && !email.subject && !email.to) {
            console.log("nothing to save")
            return
        }

        if (!draftSaved) { /*email was never saved*/
            setDraftSaved(true)
            saveFirstDraft()
        }
    }, [email]);


    async function saveFirstDraft()
    {
        console.log('saving draft first time')
        setEmail((prevEmail) => ({ ...prevEmail, ...(onSaveToDraft(prevEmail)) }))
        // const newEmail = await onSaveToDraft(email)
        // console.log(`new draft id :${newEmail.id}`)
        // setEmail((prevEmail) => ({ ...prevEmail, id: newEmail.id }))
        return
    }

    async function handleDraftMechanism() {
        if (!draftSaved) { /*draft is not in db yet*/
              return
        }

        if (!timerId) {
            console.log('setting timer')
            // const newTimerId = setTimeout(() => {handleDraftMechanismTimeout}, 5000); // 5000 milliseconds (5 seconds)
            setTimerID(setTimeout(() => { handleDraftMechanismTimeout() }, 5000))
            return
        }
    }

    function handleDraftMechanismTimeout() {
        setTimerID(0)
        console.log('Timer expired! saving draft');
        onSaveToDraft(email)
        
    }


    function onSendComposedEmail(event) {
        event.preventDefault();
        if (!email.to) {
            alert('ERROR - Please specify at least one recipient.');
            return;
        }
        email.sentAt = Date.now()
        email.from = emailService.getLoggedinUserEmail()
        onSendEmail(email)
        navigate(`/mail/${params.folder}`)
    }



    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        // console.log(`in handleChange: value=${value} name=${field} type=${type}`)
        value = type === 'number' ? +value : value
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
        handleDraftMechanism()

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
