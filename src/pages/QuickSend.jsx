import { useNavigate, NavLink } from "react-router-dom"
import { AppFooter } from "../cmps/AppFooter.jsx"
export function QuickSend() {
    const navigate = useNavigate()
    return (
        /*learning github*/
        <div className="quick-send">
            <AppFooter />
        </div>

    )
}
