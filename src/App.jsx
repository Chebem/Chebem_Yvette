import { useState, useEffect } from "react";
import { gsap } from 'gsap';
import { Routes, Route} from 'react-router-dom';
import Hero from './pages/Hero';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SpotifyWidget from "./components/SpotifyWidget/SpotifyWidget";



function App() {
    const [introKey, setIntroKey] = useState(0);
    const [showIntro, setShowIntro] = useState(true);


    useEffect(() => {
        //Respect user's motion preference
        const prefersReducedMotion = window.matchMedia('prefers-reduced-motion: reduce').matches;

        if (prefersReducedMotion) {
            //Skip animations
            gsap.set('.line-left', { height: '100%' });
            gsap.set('.line-top', { width: '100%' });
            return;
        }

        gsap.to('.line-left', {
           height: '100%',
           duration: 1.2,
           ease: 'power3.inOut',
           delay: 0.2,
        });

        gsap.to('.line-top', {
            width: '100%',
            duration: 1.2,
            ease: 'power3.inOut',
            delay: 0.2,
        });
    }, [introKey]);

    useEffect(() => {
        const replay = () => {
            setShowIntro(true);
            setIntroKey((k) => k + 1);
        };
        return () => window.removeEventListener('replay-intro', replay);
    }, []);

  return (
      <>
          <div className="line-left"></div>
          <Routes>
              <Route path="/" element={<Hero />} />
              <Route path= "/home" element={<Home />} />
              <Route path= "/project/:id" element={<ProjectDetail />} />
          </Routes>
          <SpotifyWidget />
      </>
  );
}

export default App
