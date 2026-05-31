import React from 'react';
import Header from '../components/Header/Header';
import About from '../components/sections/About/About';
import Contact from '../components/sections/Contact/Contact';
import Footer from '../components/sections/Footer/Footer';


function Home () {

    return (
        <>
            <Header />
            <About />
            <Contact />
            <Footer />
        </>
    )
}

export default Home;