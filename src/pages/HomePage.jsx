// import imgUrl from '../assets/imgs/react.png'

import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";



export function HomePage() {
    const navigate = useNavigate()

    function onSignIn() {
        navigate("/mail/inbox")
    }
    return (
        <section className="home-page">
            <div className="sign-in-area">
                <img className="mister-email-img" src={utilService.getIconUrl("mister-email")} />
                <h2>to continue to Mister Email</h2>
                <div className='btn-signin' onClick={onSignIn}>Sign-in </div>
                
                <hr />
                <p> To create a new user:</p>
                <form>
                    <div>
                        <label htmlFor="emailInput"></label>
                        <input type="text" id="emailInput" placeholder="Email" />
                    </div>
                    <div>
                        <label htmlFor="passwordInput"></label>
                        <input type="text" id="passwordInput" placeholder="Password" />
                    </div>
                    <div className='btn-signup-container'>
                        <button className='btn-signup' onClick={onSignIn}>Sign-up </button>
                    </div>
                </form>
            </div>
        </section >
    )
}
