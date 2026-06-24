import Header from '../components/Header/Header';
import About from '../components/sections/About/About';
import Projects from '../components/sections/Projects/Projects.jsx'
// import Contact from '../components/sections/Contact/Contact';
// import Footer from '../components/sections/Footer/Footer';


function Home () {
    return (
        <>
            <Header />
            <About />
            <Projects/>
            {/*<Contact />*/}
            {/*<Footer />*/}
        </>
    )
}

export default Home;