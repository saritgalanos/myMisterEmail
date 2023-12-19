import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import Select from 'react-select'

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function logFilter() {
        console.log("filter.txt:"+filterByToEdit.txt)
        console.log("filter.sortBy:"+filterByToEdit.sortBy)
        console.log("filter.isRead:"+filterByToEdit.isRead)
    }
    logFilter()


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange(ev) {
        let { name: field, value, type } = ev.target
        if (type === 'number') value = +value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const handleSelectChange = (ev) => {
        setSelectedOption(ev.target.value);
    }

   
    function getArrowIconUrl(sortTopic) {

        if (sortTopic === 'date' && filterByToEdit.sortBy === 'dateAsc' ||
            sortTopic === 'subject' && filterByToEdit.sortBy === 'subjectAsc') {
            return utilService.getIconUrl('upper-arrow', false)
        }
        else {
            return utilService.getIconUrl('down-arrow', false)
        }
    }


    let {emailStatus, txt, isRead, sortBy } = filterByToEdit
    const sortDate = (sortBy != 'dateAsc') ? 'dateAsc' : 'dateDes'
    const sortSubject = (sortBy != 'subjectAsc') ? 'subjectAsc' : 'subjectDes'

    return (

        <section className="email-filter">
            <button className="sort-button" value={sortDate} name="sortBy" onClick={handleChange}>
                <img src={getArrowIconUrl('date')} className="icon" />
                Date
            </button>
            <button className="sort-button" id='subject' value={sortSubject} name="sortBy" onClick={handleChange}>
                <img src={getArrowIconUrl('subject')} className="icon" />
                Subject
            </button>


            <label htmlFor="dropdown"></label>
            <select id="dropdown" value={isRead} onChange={handleChange} name='isRead'>
                <option value="All">All</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </select>
        </section>
    )
}
