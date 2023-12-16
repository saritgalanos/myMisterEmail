import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function EmailFolderList() {

    function OnStarFilter() {

    }

    return (

        <section className="email-folder-list">
            <button className="compose-button centered" > <img src={utilService.getIconUrl('compose', false)} className="icon"/>Compose</button>
            <div></div>
            <img className="email-folder-icon centered" onClick={() => OnStarFilter()} src={utilService.getIconUrl('inbox', false)} />
            <div> inbox </div>
            <div className="centered">5</div>
            <img className="email-folder-icon centered" onClick={() => OnStarFilter()} src={utilService.getIconUrl('star', false)} />
            <div> Starred </div>
            <div className="centered"> 9 </div>
            <img className="email-folder-icon centered" onClick={() => OnStarFilter()} src={utilService.getIconUrl('sent', false)} />
            <div>Sent </div>
            <div className="centered"> 7 </div>
            <img className="email-folder-icon centered" onClick={() => OnStarFilter()} src={utilService.getIconUrl('draft', false)} />
            <div> Draft </div>
            <div className="centered"> 6</div>
            <img className="email-folder-icon centered" onClick={() => OnStarFilter()} src={utilService.getIconUrl('trash', false)} />
            <div> Trash </div>
            <div className="centered"> 8 </div>



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
