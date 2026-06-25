import {useEffect} from "react";
import { gsap } from 'gsap';
import { Routes, Route} from 'react-router-dom';
import Hero from './pages/Hero';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail.jsx';



function App() {
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
    }, []);

  return (
      <>
          <div className="line-left"></div>
          <Routes>
              <Route path="/" element={<Hero />} />
              <Route path= "/home" element={<Home />} />
              <Route path= "/project/:id" element={<ProjectDetail />} />
          </Routes>
      </>

  );
}

export default App
