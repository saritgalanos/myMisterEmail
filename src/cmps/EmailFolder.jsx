import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useNavigate } from 'react-router-dom'

export function EmailFolder({ folder, filterBy ,onSetEmailStatus}) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()    
    useEffect(() => {
        onSetEmailStatus(filterByToEdit)
    }, [filterByToEdit])

    function onFolder(value) {
        console.log('onFolder:' + value)
        
        setFilterByToEdit(prevFilter => ({ ...prevFilter, emailStatus: value }))
        navigate(`${folder.name}`);
    }

    function selectedFolderClass(folderName) {
        return folderName === filterBy.emailStatus ? "selected-folder" : ""
    }
    function isSelected (folderName) {
        return (folderName === filterBy.emailStatus)
    } 
    return (
         <div
            key={folder.name}
            className={`folder ${selectedFolderClass(folder.name)}`}
            onClick={() => onFolder(folder.name)}
        >
            <img src={utilService.getIconUrl(folder.name, isSelected(folder.name))} alt={`${folder.label} Icon`} />
            <div>{folder.label}</div>
            <p>{(folder.count !== 0) ? folder.count : ""}</p>
        </div>

    )
}