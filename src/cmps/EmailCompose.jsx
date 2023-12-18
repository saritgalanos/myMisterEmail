import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function EmailCompose() {
    const navigate = useNavigate()
    return (
        <div className="Compose">

         
                <div className="modal-content">
                    <div className="compose-header">New Message</div>
                    <span className="close-btn compose-header" onClick={() => navigate('/mail')}>X</span>
                    <div className='input-field'>From <span className="internal-text">saritgalanos@gmail.com</span></div> <div></div>
                    <div className='input-field'>To</div> <div></div>
                    <div className='input-field'>Subject</div><div></div>
                    <div className=' input-body'>Compose your email</div><div></div>
                    <div>
                        <button className='send-button' onClick={() => navigate('/mail')}>Send</button>
                    </div>
              


            </div>
        </div>
    )
}
