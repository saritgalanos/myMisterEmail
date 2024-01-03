import { useNavigate, NavLink } from "react-router-dom"
import { AppFooter } from "../cmps/AppFooter"
import { utilService } from "../services/util.service"
export function AboutUs() {
    const navigate = useNavigate()
    return (
        /*learning github*/
        <div className="about-us">
            <div className="about-us-content">
                <header>
                    <h1>About Us</h1>
                    <p>
                    MisterEmail is a  web-based email service that provides users with 15 GB of storage for messages and the ability
                    to search for specific messages.
                    <br>
                    </br>MisterEmail can be accessed from a personal computer, tablet or any Android or iOS device.
                    <br></br>
                    The company was inspired to create MisterEmail because of a user's  complaining about problems with existing email services.
                    <br></br>
                </p>
            </header>
            <div className="partners">

                <h1> Our Partners</h1>
                <img src={utilService.getIconUrl("amazon", false)} />
                <img src={utilService.getIconUrl("amdocs", false)} />
                <img src={utilService.getIconUrl("tmo", false)} />
            </div>

            <div className="reviews">
                <h1>Trusted by Our Dedicated Community</h1>
                We strongly believe in MisterEmail and the incredible value it brings.
                <br></br>
                 But don’t just take our word for it.
                    Here are some kind messages from both community members & professionals, that are passionate about our platform.

                <h3>User Reviews</h3>
                
                    <h2>Excellent</h2>
                    <img src={utilService.getIconUrl("trustpilot", false)} />
                    
                    <br></br>
                    Based on 360 reviews


                

            </div>

            <AppFooter />

        </div>
        </div >
    )
}
