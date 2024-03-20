import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import Bio from './components/Bio'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/career" element={<div>Career</div>} />
        <Route path="/stack" element={<div>Stack</div>} />
        <Route path="/projects" element={<div>Projects</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </>
  )
}

export default App
