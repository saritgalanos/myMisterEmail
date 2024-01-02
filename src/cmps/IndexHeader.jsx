import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"
import { useForm } from "./customHooks/useForm";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { emailService } from "../services/email.service";
import { Tooltip } from "@mui/material";

export function IndexHeader({ filterBy, handleSearchSubmit }) {

    /*no cb for every change, just accumulation*/
    const [filterByToEdit, handleChange] = useForm(filterBy, null)

    //  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isSearchAreaClicked, setIsSearchAreaClicked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        handleSearchSubmit(filterByToEdit)
    }

    const handleSearchAreaClick = () => {
        setIsSearchAreaClicked(!isSearchAreaClicked);
    }
    

    return (
        <header className="index-header">
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
            <div className="avatar">
                <Tooltip title={
                    <div>
                        {emailService.getLoggedinUser().fullname}
                        <br />
                        {emailService.getLoggedinUser().email}
                    </div>
                }>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>SG</Avatar>
                </Tooltip>
            </div>
        </header >
    )
}

