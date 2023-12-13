import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function EmailFolderList() {
    
    function OnStarFilter() {

    }

    return (

        <section className="email-folder-list">
            <button className="compose-button">Compose</button>
            <div className="image-with-text"><img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('inbox',false)} /> <p>Inbox</p> </div>
            <div className="image-with-text"><img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('star', false)} /> <p>Starred</p> </div>
            <div className="image-with-text"><img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('sent',false)} /> <p>Sent</p> </div>
            <div className="image-with-text"><img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('draft',false)} /> <p>Draft</p> </div>
            <div className="image-with-text"><img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('trash', false)} /> <p>Trash</p> </div>
        </section>

    )
}
