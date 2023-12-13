import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { EmailFolderList } from './cmps/EmailFolderList';


export function App() {

    return (

        <Router>
            <section className='main-app'>
                <AppHeader />
                <main className='outer-container'>
                    <EmailFolderList />
                    <div className='routers-container'>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/emails" element={<EmailIndex />} />
                            <Route path="/email/:emailId" element={<EmailDetails />} />

                        </Routes>

                    </div>
                </main>
            </section>
        </Router>









        // <section className='main-app'>
        //     <header className="app-header">
        //         <section className="container">
        //             <h1>Log111</h1>
        //         </section>
        //     </header>

        //     <main className='container'>
        //         <Home />
        //     </main>

        //     <footer>
        //         <section className="container">
        //             Mails 2023 &copy;
        //         </section>
        //     </footer>
        // </section>


    )
}

