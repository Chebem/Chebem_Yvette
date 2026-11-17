import Header from '../../components/Header/Header.jsx';
import About from '../../components/sections/About/About.jsx';
import MyStory from "../../components/sections/Mystory/Mystory.jsx";
import Skills from "../../components/sections/Skills/Skills.jsx";
import KoreaTimeline from "../../components/sections/KoreaTimeline/KoreaTimeline.jsx";
import PhotoBoard from "../../components/sections/Photoboard/Photoboard.jsx";
import Contact from '../../components/sections/Contact/Contact.jsx';
import Footer from '../../components/sections/Footer/Footer.jsx';


function AboutPage () {
    return (
        <>
            <Header />
            <About />
            <MyStory />
            <Skills />
            <KoreaTimeline />
            <PhotoBoard />
            <Contact />
            <Footer />
        </>
    )
}

export default AboutPage;