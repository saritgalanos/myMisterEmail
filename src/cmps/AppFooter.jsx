import { useNavigate, NavLink } from "react-router-dom"
export function AppFooter() {
    const navigate = useNavigate()
    return (
        /*learning github*/
        <div className="app-footer">
                <div className="additional-links">
                    <NavLink to={`/`} >Home</NavLink>
                    <p>&nbsp;|&nbsp;</p>
                    <NavLink to={`/dashboard`} >Dashboard</NavLink>
                    <p>&nbsp;|&nbsp;</p>
                    <NavLink to={`/mail/inbox/edit?to=help@gmail.com&subject=Help`} >Quick Send</NavLink>
                    <p> &nbsp;|&nbsp;</p>
                    <NavLink to={`/about`} >About</NavLink>
                </div>
        </div >
    )
}
