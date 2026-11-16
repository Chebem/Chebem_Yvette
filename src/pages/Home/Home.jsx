import { useEffect, useState } from "react";

import Preloader from "../../components/Preloader/Preloader.jsx";
import Header from "../../components/Header/Header.jsx";
import HeroStory from "../../components/HeroStory/HeroStory.jsx";
import Projects from "../../components/sections/Projects/Projects.jsx";
import Contact from "../../components/sections/Contact/Contact.jsx";
import Footer from "../../components/sections/Footer/Footer.jsx";

import './Home.css';

function Home() {
    const [showPreloader, setShowPreloader] = useState(true);

    // Logo click in the Header replays the intro — the preloader state lives here
    useEffect(() => {
        const replay = () => setShowPreloader(true);
        window.addEventListener('replay-intro', replay);
        return () => window.removeEventListener('replay-intro', replay);
    }, []);

    return (
        <>
            {showPreloader && (
                <Preloader onComplete={() => setShowPreloader(false)} />
            )}
            <Header />
            <HeroStory />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}

export default Home;
