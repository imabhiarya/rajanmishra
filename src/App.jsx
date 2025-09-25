import { useState } from 'react'
import './App.css'
import Portfolio from './components/Portfolio'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Portfolio />
   {/* <VideoShowcase /> */}

    </>
  )
}

export default App
