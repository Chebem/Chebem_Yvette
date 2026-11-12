import { useState, useEffect } from "react";
import { gsap } from 'gsap';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectDetail from './pages/ProjectDetails/ProjectDetail.jsx';
import SpotifyWidget from "./components/SpotifyWidget/SpotifyWidget";



function App() {
    const [introKey, setIntroKey] = useState(0);


    useEffect(() => {
        //Respect user's motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            //Skip animations
            gsap.set('.line-left', { height: '100%' });
            gsap.set('.line-top', { width: '100%' });
            return;
        }

        // fromTo, not to — on replay the lines are already at 100%,
        // so they need resetting or the tween has nothing to animate
        const leftTween = gsap.fromTo('.line-left',
            { height: 0 },
            { height: '100%', duration: 1.2, ease: 'power3.inOut', delay: 0.2 }
        );

        const topTween = gsap.fromTo('.line-top',
            { width: 0 },
            { width: '100%', duration: 1.2, ease: 'power3.inOut', delay: 0.2 }
        );

        return () => {
            leftTween.kill();
            topTween.kill();
        };
    }, [introKey]);

    useEffect(() => {
        const replay = () => setIntroKey((k) => k + 1);
        window.addEventListener('replay-intro', replay);
        return () => window.removeEventListener('replay-intro', replay);
    }, []);

  return (
      <>
          <div className="line-left"></div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path= "/about" element={<AboutPage />} />
              <Route path= "/project/:id" element={<ProjectDetail />} />
          </Routes>
          <SpotifyWidget />
      </>
  );
}

export default App
