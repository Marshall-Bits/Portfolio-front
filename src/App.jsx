import './App.css'
import Hero from './components/Hero'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import Tools from './components/Tools'
import Footer from './components/Footer'
import TalkingContainer from './components/TalkingContainer'
import info from './info.json'
import spaceShip from './assets/spaceship.webp'

function App() {

  return (
    <>
      <div id='space'></div>
      <img id='spaceship' src={spaceShip} alt="spaceship" />
      <Hero />

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/bio" element={<TalkingContainer text={info.bio} />} />
        <Route path="/career" element={<TalkingContainer text={info.career} />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
      <div id='sky'></div>
      <Footer />
    </>
  )
}

export default App
