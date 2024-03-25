import './App.css'
import Hero from './components/Hero'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import Tools from './components/Tools'
import Footer from './components/Footer'
import TalkingContainer from './components/TalkingContainer'
import info from './info.json'
import spaceShip from './assets/spaceship.webp'
import cables from './assets/cables.webp'
import moon from './assets/moon.webp'
import redPlanet from './assets/red-planet.webp'
import bluePlanet from './assets/blue-planet.webp'
import purplePlanet from './assets/purple-planet.webp'

function App() {

  return (
    <>
      <img id='spaceship' src={spaceShip} alt="spaceship" />
      <img id='cables' src={cables} alt="cables" />
      <img id='moon' src={moon} alt="moon" />
      <img id='red-planet' src={redPlanet} alt="red-planet" />
      <img id='blue-planet' src={bluePlanet} alt="blue-planet" />
      <img id='purple-planet' src={purplePlanet} alt="purple-planet" />
      <div id='stars'  />
      <div id='sky'></div>
      <Hero />

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/bio" element={<TalkingContainer text={info.bio} />} />
        <Route path="/career" element={<TalkingContainer text={info.career} />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
