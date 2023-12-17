import { useEffect, useState } from "react"

export function EmailCompose({ onClose }) {

    return (
        <div className="Compose">

         
                <div className="modal-content">
                    <div className="compose-header">New Message</div>
                    <span className="close-btn compose-header" onClick={onClose}>X</span>
                    <div className='input-field'>From <span className="internal-text">saritgalanos@gmail.com</span></div> <div></div>
                    <div className='input-field'>To</div> <div></div>
                    <div className='input-field'>Subject</div><div></div>
                    <div className=' input-body'>Compose your email</div><div></div>
                    <div>
                        <button className='send-button' onClick={onClose}>Send</button>
                    </div>
              


            </div>
        </div>
    )
}
