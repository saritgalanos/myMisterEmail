import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { Link, useNavigate } from 'react-router-dom'

export function EmailFolder({ folder, filterBy, onSetSelectedFolder }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()
    useEffect(() => {
        onSetSelectedFolder(filterByToEdit)
    }, [filterByToEdit])

    function onFolder(value) {
        // console.log('onFolder:' + value)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, selectedFolder: value }))
    }

    function selectedFolderClass(folderName) {
        return folderName === filterBy.selectedFolder ? "selected-folder" : ""
    }
    function isSelected(folderName) {
        return (folderName === filterBy.selectedFolder)
    }
    return (
        <Link to={`/mail/${folder.name}`} >
            <div className={`folder ${selectedFolderClass(folder.name)}`}
                onClick={() => onFolder(folder.name)}
            >
                <img src={utilService.getIconUrl(folder.name, isSelected(folder.name))} alt={`${folder.label} Icon`} />
                <div className="txt">{folder.label}</div>
                <p>{(folder.count !== 0) ? folder.count : ""}</p>
            </div>
        </Link>
    )
}