import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { EmailFilter } from "./EmailFilter"

export function EmailFolderList({ onCompose, filterBy, onSetEmailStatus }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetEmailStatus(filterByToEdit)
    }, [filterByToEdit])

    function onFolder(value) {
        console.log('onFolder:' + value)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, emailStatus: value }))
    }


    function isSelectedFolder(folderName) {
        return folderName === filterBy.emailStatus ? "selected-folder" : ""
    }

    const folders = [
        { name: 'inbox', label: 'Inbox', count: 5 },
        { name: 'starred', label: 'Starred', count: 9 },
        { name: 'sent', label: 'Sent', count: 7 },
        { name: 'draft', label: 'Draft', count: 6 },
        { name: 'trash', label: 'Trash', count: 8 },
    ]


    return (

        <section className="email-folder-list">
            <div className="compose-area">
                <button className="compose-button centered" onClick={onCompose}> <img src={utilService.getIconUrl('compose', false)} className="icon" />Compose</button>
            </div>
            <section className="folder-area">
                {folders.map((folder) => (
                    <div
                        key={folder.name}
                        className={`folder ${isSelectedFolder(folder.name)}`}
                        onClick={() => onFolder(folder.name)}
                    >
                        <img src={utilService.getIconUrl(folder.name, false)} alt={`${folder.label} Icon`} />
                        <div>{folder.label}</div>
                        <p>{folder.count}</p>
                    </div>
                ))}
            </section>

        </section >

    )
}




{/* <div className={`folder ${isSelectedFolder('inbox')}`}
                    onClick={() => onFolder('inbox')}>
                    <img src={utilService.getIconUrl('inbox', false)} />
                    <div> inbox </div>
                    <p>5</p>
                </div>
                <div className={`folder ${isSelectedFolder('starred')}`}
                    onClick={() => onFolder('starred')}    >
                    <img src={utilService.getIconUrl('starred', false)} />
                    <div> Starred </div>
                    <p> 9 </p>
                </div>
                <div className={`folder ${isSelectedFolder('sent')}`}
                    onClick={() => onFolder('sent')}      >
                    <img src={utilService.getIconUrl('sent', false)} />
                    <div>Sent </div>
                    <p> 7 </p>
                </div>
                <div className={`folder ${isSelectedFolder('draft')}`}
                    onClick={() => onFolder('draft')}  >
                    <img src={utilService.getIconUrl('draft', false)} />
                    <div> Draft </div>
                    <p> 6</p>
                </div>
                <div className={`folder ${isSelectedFolder('trash')}`}
                    onClick={() => onFolder('trash')} >
                    <img src={utilService.getIconUrl('trash', false)} />
                    <div> Trash </div>
                    <p> 8 </p>
                </div> */}