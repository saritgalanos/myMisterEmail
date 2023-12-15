import { Link, NavLink } from "react-router-dom";
import { utilService } from "../services/util.service";
import { useEffect, useState } from "react"

export function AppHeader({handleSearchSubmit}) {
    const [searchTxt, setSearchTxt] = useState("");
   
    function handleSubmit(event) {
        event.preventDefault();
        handleSearchSubmit(searchTxt)
    }

      return (
        <header className="app-header title">
            <section className="container">
                <form onSubmit={handleSubmit}>
                    <label>Search:
                        <input
                            type="text"
                            value={searchTxt}
                            onChange={(e) => setSearchTxt(e.target.value)}
                        />
                    </label>
                    <input type="submit" />
                </form>



                {/* <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/emails">Emails</NavLink>
                </nav> */}
                {/* <form onSubmit={handleSubmit}> */}
                    {/* <div className="search-area"> */}
                    {/* <div className="search-icon" ><img className="icon" onClick={() => { }} src={utilService.getIconUrl('search', false)} /></div> */}
                    {/* <label htmlFor="txt"> */}
                    {/* <label>Search: */}
                        {/* <input className="Search-box" onChange={handleChange} id="txt" value={txt || 'Search'} name="txt" type="text" /> */}
                        {/* <input onChange={handleChange} value={'Search'} type="text" />
                    </label>
                    <input type="submit" /> */}
                    {/* </div> */}
                {/* </form> */}
            </section>
        </header>
    )
}

