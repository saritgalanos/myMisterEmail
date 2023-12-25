// import imgUrl from '../assets/imgs/react.png'

import { useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";
import { NavLink } from 'react-router-dom';
export function HomePage() {
    const navigate = useNavigate()
    return (
        <section className="home">
            <div className="login-area">
                <img className="login-img" src={utilService.getIconUrl("mister-email")} />
                <h1>Sing in</h1>
                <h2>to continue to Mister Email</h2>
                <form>
                    <div className="user-data"><label>
                        <input className="input-box" type="text" placeholder="Email" />
                    </label></div>
                    <div className="user-data">
                        <label>
                            <input className="input-box" type="text" placeholder="Password" />
                        </label>
                    </div>
                </form>
               <div className="center-container"><div className='login-button'> <NavLink to="/mail/inbox" >Sign-in</NavLink> </div></div> 
            </div>
        </section>
    )
}
