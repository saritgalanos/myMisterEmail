import { useNavigate, NavLink } from "react-router-dom"
import { AppFooter } from "../cmps/AppFooter"
export function AboutUs() {
    const navigate = useNavigate()
    return (
        /*learning github*/
        <div className="about-us">
            <div className="about-us-content">
                <header>
                    <h1>About Us</h1>
                </header>
                <section className="company-information">
                    <div className="offices information-section">Offices</div>
                    <div className="products information-section">Products</div>
                    <div className="team information-section">Our Team</div>
                    <div className="positions information-section">Open Positions</div>


                </section>
                <AppFooter />

            </div>
        </div >
    )
}
