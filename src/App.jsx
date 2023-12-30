import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { EmailFolderList } from './cmps/EmailFolderList';
import { useEffect, useState } from "react"
import { EmailCompose } from "./cmps/EmailCompose"
import { Dashboard } from './pages/Dashboard'

export function App() {




    return (

        <Router>
            <section>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/mail/:folder" element={<EmailIndex />}>
                        <Route path="/mail/:folder/:emailId" element={<EmailDetails />} />
                    </Route>
                </Routes>
            </section>

        </Router>)
}

