import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { EmailFolderList } from './cmps/EmailFolderList';
import { useEffect, useState } from "react"
import { EmailCompose} from "./cmps/EmailCompose"

export function App() {

    const [searchTxt, setSearchTxt] = useState("");
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);

    function openComposeModal() {
        console.log('openComposeModal')
        setComposeModalOpen(true)
    }

    function closeComposeModal() {
        console.log('closeComposeModal')
        setComposeModalOpen(false)
    }

    console.log(closeComposeModal)

    function handleSearchSubmit(value) {
        setSearchTxt(value)
    }

    return (

        <Router>
            <section className='main-app'>
                <header className="app-header"><AppHeader handleSearchSubmit={handleSearchSubmit} /></header>
                <aside className="app-side"><EmailFolderList onCompose={openComposeModal}/></aside>
                <main className="app-main-area">
                    <Routes>
                        {/* <Route path="/" element={<HomePage />} /> */}
                        {/* <Route path="/about" element={<AboutUs />} /> */}
                        <Route path="/" element={<EmailIndex searchTxt={searchTxt} />} />
                        <Route path="/:emailId" element={<EmailDetails />} />

                    </Routes>

                    {isComposeModalOpen && (<EmailCompose onClose={closeComposeModal} />)}



                </main>
            </section>
        </Router>
    )
}

