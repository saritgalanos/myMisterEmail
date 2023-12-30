import React from 'react'
import { Link } from 'react-router-dom'

export function Header() {

    const attributes = {
        className: "main-header flex align-center space-between",
        title: 'Hello!!!!!!'
    }
    return (
        <header {...attributes} >
            <Link to="/"><div className="logo">MyApp</div></Link>
            <ul className="main-nav flex clean-list">
                <li className="link flex align-center">Link1</li>
                <li className="link flex align-center">Link2</li>
                <li className="link flex align-center">Link3</li>
            </ul>
        </header >
    )
}
