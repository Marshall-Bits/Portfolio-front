import './App.css'
import Hero from './components/Hero'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import Bio from './components/Bio'
import Career from './components/Career'
import Tools from './components/Tools'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div id='space'></div>
      <Hero />

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/career" element={<Career />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/projects" element={<div>Projects</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
      <div id='sky'></div>
      <Footer />
    </>
  )
}

export default App
