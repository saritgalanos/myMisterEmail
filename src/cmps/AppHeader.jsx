import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header title">
            <section className="container">
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/emails">Emails</NavLink>
                </nav>
            </section>
        </header>
    )
}
