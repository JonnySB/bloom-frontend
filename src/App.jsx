import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './componenets/Homepage'
import HelpRequestList from './componenets/HelpRequestList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HelpRequestList />
    </>
  )
}

export default App
