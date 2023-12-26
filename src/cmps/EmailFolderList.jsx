import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { EmailFolder } from "./EmailFolder"
import { emailService } from "../services/email.service"

export function EmailFolderList({ onCompose, filterBy, onSetSelectedFolder }) {

    const folders = emailService.getFolders()
    return (
        <section className="email-folder-list">
            <div className="compose-area">
                <button className="compose-button centered" onClick={()=>onCompose()}> <img src={utilService.getIconUrl('compose', false)} className="icon" />Compose</button>
            </div>
            <section className="folder-area">
                {folders.map((folder) => <EmailFolder key={folder.name} folder={folder} filterBy={filterBy} onSetSelectedFolder={onSetSelectedFolder} />)}

            </section>

        </section >

    )
}
