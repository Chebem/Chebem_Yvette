import Header from '../components/Header/Header';
import About from '../components/sections/About/About';
import MyStory from "../components/sections/Mystory/Mystory";
import KoreaTimeline from "../components/sections/KoreaTimeline/KoreaTimeline";
import PhotoBoard from "../components/sections/Photoboard/Photoboard";
// import Contact from '../components/sections/Contact/Contact';
// import Footer from '../components/sections/Footer/Footer';


function AboutPage () {
    return (
        <>
            <Header />
            <About />
            <MyStory />
            <KoreaTimeline />
            <PhotoBoard />
            {/*<Contact />*/}
            {/*<Footer />*/}
        </>
    )
}

export default AboutPage;