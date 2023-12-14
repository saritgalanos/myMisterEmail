import { Link, NavLink } from "react-router-dom";
import { utilService } from "../services/util.service";

export function AppHeader() {
    let txt;
    return (
        <header className="app-header title">
            <section className="container">
                {/* <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/emails">Emails</NavLink>
                </nav> */}
                <form>
                    <div className="search-area">
                    <div className="search-icon" ><img className="icon" onClick={() => { }} src={utilService.getIconUrl('search', false)} /></div>
                        <label htmlFor="txt"></label>
                        <input className="Search-box" list="options" id="txt" value={txt || 'Search'} name="txt" type="text" />
                        {/* <input className="txt" list="options" onChange={handleChange} id="txt" value={txt || ''} name="txt" type="text" /> */}
                    </div>
                </form>
            </section>
        </header>
    )
}
