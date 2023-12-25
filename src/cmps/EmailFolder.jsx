import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { useNavigate } from 'react-router-dom'

export function EmailFolder({ folder, filterBy, onSetselectedFolder }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const navigate = useNavigate()
    useEffect(() => {
        onSetselectedFolder(filterByToEdit)
    }, [filterByToEdit])

    function onFolder(value) {
        console.log('onFolder:' + value)

        setFilterByToEdit(prevFilter => ({ ...prevFilter, selectedFolder: value }))
        navigate(`${folder.name}`);
    }

    function selectedFolderClass(folderName) {
        return folderName === filterBy.selectedFolder ? "selected-folder" : ""
    }
    function isSelected(folderName) {
        return (folderName === filterBy.selectedFolder)
    }
    return (
        <div className={`folder ${selectedFolderClass(folder.name)}`}
            onClick={() => onFolder(folder.name)}
        >
            <img src={utilService.getIconUrl(folder.name, isSelected(folder.name))} alt={`${folder.label} Icon`} />
            <div>{folder.label}</div>
            <p>{(folder.count !== 0) ? folder.count : ""}</p>
        </div>

    )
}