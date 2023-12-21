import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"

export function AppHeader({ filterBy, handleSearchSubmit }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isSearchAreaClicked, setIsSearchAreaClicked] = useState(false);

    useEffect(() => {
        /*immediate search capability*/
        //handleSearchSubmit(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        // console.log(`in handleChange: value=${value} name=${field} type=${type}`)
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    function handleSubmit(event) {
        event.preventDefault();
        handleSearchSubmit(filterByToEdit)
    }

    const handleSearchAreaClick = () => {
        setIsSearchAreaClicked(!isSearchAreaClicked);
    }

    //search-area-clicked
    return (
        <header className="app-header">
            <section className={`search-area ${isSearchAreaClicked ? "" : ""}`} onClick={handleSearchAreaClick}>
                <form onSubmit={handleSubmit} className="search-form">
                    <button type="submit">
                        <img src={utilService.getIconUrl('search', false)} className="icon" />
                    </button>
                    <label htmlFor="search"></label>
                    <input id="search" name="txt" type="text" placeholder="Search"
                        value={filterByToEdit.txt}
                        onChange={handleChange} />
                </form>
            </section>
        </header>
    )
}

