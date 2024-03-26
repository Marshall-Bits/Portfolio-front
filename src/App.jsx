import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import useImageLoader from './hooks/useImageLoader'

import Footer from './components/Footer'
import Hero from './components/Hero'
import Menu from './components/Menu'
import TalkingContainer from './components/TalkingContainer'
import Tools from './components/Tools'

import bluePlanet from './assets/blue-planet.webp'
import cables from './assets/cables.webp'
import moon from './assets/moon.webp'
import purplePlanet from './assets/purple-planet.webp'
import redPlanet from './assets/red-planet.webp'
import spaceShip from './assets/spaceship.webp'

import bioIcon from './assets/bio-icon.webp';
import toolsIcon from './assets/tools-icon.webp';
import cvIcon from './assets/cv-icon.webp';
import ghIcon from './assets/gh-icon.webp';
import inIcon from './assets/in-icon.webp';

import info from './info.json'

function App() {

  const isLoading = useImageLoader([
    bluePlanet,
    cables,
    moon,
    purplePlanet,
    redPlanet,
    spaceShip,
    bioIcon,
    toolsIcon,
    cvIcon,
    ghIcon,
    inIcon
  ]);

  const menuIcons = {bioIcon, toolsIcon, cvIcon, ghIcon, inIcon};

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div id='stars' />
      <div id='sky'></div>
      <img id='moon' src={moon} alt="moon" />
      <img id='red-planet' src={redPlanet} alt="red-planet" />
      <img id='blue-planet' src={bluePlanet} alt="blue-planet" />
      <img id='purple-planet' src={purplePlanet} alt="purple-planet" />
      <img id='spaceship' src={spaceShip} alt="spaceship" />
      <img id='cables' src={cables} alt="cables" />
      <Hero />
      <Routes>
        <Route path="/" element={<Menu icons={menuIcons} />} />
        <Route path="/bio" element={<TalkingContainer text={info.bio} />} />
        <Route path="/career" element={<TalkingContainer text={info.career} />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
