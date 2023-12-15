import { Link, NavLink } from "react-router-dom";
import { utilService } from "../services/util.service";
import { useEffect, useState } from "react"

export function AppHeader({handleSearchSubmit}) {
    const [searchTxt, setSearchTxt] = useState("");
    // const [isClicked, setIsClicked] = useState(false)
   
    function handleSubmit(event) {
        event.preventDefault();
        handleSearchSubmit(searchTxt)
    }

    // function handleFocus() {
    //     setIsClicked(true)
    // }


    const inputClassName=  "search-box"


      return (
        <header className="app-header title">
            <section className="container">
            
                <form onSubmit={handleSubmit}>
                <div className="search-area">
                <button type="submit" className="search-submit" > 
                    <img src={utilService.getIconUrl('search', false)} className="icon"/>
                </button>
                    <label htmlFor="search"></label>
                        <input className={inputClassName}
                        name="search"
                            type="text"
                            value={searchTxt}
                            onChange={(e) => setSearchTxt(e.target.value)}
                            // onFocus={() => handleFocus()}
                            placeholder="Search"
                        />
                  
                  </div>
                </form>
              

  {/* <form>
                <label htmlFor="txt">Search</label>
                <input className="txt" list="options" onChange={handleChange} id="txt" value={txt || ''} name="txt" type="text" />
            </form> */}
 

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

