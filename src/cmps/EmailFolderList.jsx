import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function EmailFolderList() {

    function OnStarFilter() {

    }

    return (

        <section className="email-folder-list">
            <button className="compose-button">Compose</button>
            <img className="inbox-folder-icon email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('inbox', false)} />
            <div> inbox </div>
            <div> 5 </div>
            <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('star', false)} />
            <div> Starred </div>
            <div> 9 </div>
            <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('sent', false)} />
            <div>Sent </div>
            <div> 7 </div>
            <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('draft', false)} />
            <div> Draft </div>
            <div> 6</div>
            <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('trash', false)} />
            <div> Trash </div>
            <div> 8 </div>



        </section >

        //    <button className="compose-button">Compose</button>
        //     <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('inbox', false)} /> <div>Inbox </div>
        //     <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('star', false)} /><div> Starred </div>
        //     <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('sent', false)} /> <div>Sent </div>
        //     <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('draft', false)} /><div> Draft </div>
        //     <img className="email-folder-icon" onClick={() => OnStarFilter()} src={utilService.getIconUrl('trash', false)} /><div> Trash </div> 
        // </section >

    )
}
