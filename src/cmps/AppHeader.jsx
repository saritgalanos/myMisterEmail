import { utilService } from "../services/util.service";
import { useEffect, useState } from "react"

export function AppHeader({ filterBy, handleSearchSubmit }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    //const [searchTxt, setSearchTxt] = useState(filterBy.txt);
    // const [isSearchClicked, setSearchClicked] = useState(false)


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

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (isSearchClicked && !event.target.closest('.search-area')) {
    //             setSearchClicked(false)
    //         }
    //     }

    //     window.addEventListener('click', handleClickOutside);
    //     return () => {
    //         window.removeEventListener('click', handleClickOutside)
    //     }
    // }, [isSearchClicked])







    const SearchAreaClicked = ''//isSearchClicked ? "search-area-clicked" : ""


    return (
        <header className="app-header title">
            <section className="search-area">
                <form onSubmit={handleSubmit} className="search-form">
                    <button type="submit" className="search-submit">
                        <img src={utilService.getIconUrl('search', false)} className="icon" />
                    </button>
                    <label htmlFor="search"></label>
                    <input className="search-input"
                        id="search"
                        name="txt"
                        type="text"
                        value={filterByToEdit.txt}
                        placeholder="Search"
                        onChange={ handleChange } />
                </form>
            </section>
        </header>
    )
}

