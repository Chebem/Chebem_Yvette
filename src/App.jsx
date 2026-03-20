import { Routes, Route} from 'react-router-dom';
import './App.css'
import Hero from './pages/Hero';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';


function App() {
  return (
    <Routes>
        <Route path ="/" element={<Hero />} />
        <Route path= "/home" element={<Home />} />
        <Route path= "/project/:id" element={<ProjectDetail />}/>
    </Routes>
  );
}

export default App
