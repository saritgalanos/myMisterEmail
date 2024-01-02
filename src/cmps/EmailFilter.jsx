import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import Select from 'react-select'
import { useEffectUpdate } from "./customHooks/useEffectUpdate"
import { useForm } from "./customHooks/useForm"


export function EmailFilter({ filterBy, onSetFilter }) {
 
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)

    
   
    function getArrowIconUrl(sortTopic) {

        if (sortTopic === 'date' && filterByToEdit.sortBy === 'dateAsc' ||
            sortTopic === 'subject' && filterByToEdit.sortBy === 'subjectAsc') {
            return utilService.getIconUrl('upper-arrow', false)
        }
        else {
            return utilService.getIconUrl('down-arrow', false)
        }
    }


    let {selectedFolder, txt, isRead, sortBy } = filterByToEdit
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



