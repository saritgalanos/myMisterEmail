import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import Select from 'react-select'

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


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

    let { isRead, txt } = filterByToEdit
 
    return (

        <section className="email-filter">
            <label htmlFor="dropdown"></label>
            <select id="dropdown" value={isRead} onChange={handleChange} name='isRead'>
                <option value="All">All</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </select>

            <form>
                <label htmlFor="txt">Filter</label>
                <input className="txt" list="options" onChange={handleChange} id="txt" value={txt || ''} name="txt" type="text" />
            </form>

        </section>
    )
}
