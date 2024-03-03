import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddPlant from './components/MyPlants/AddPlant'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddPlant />
    </>
  )
}

export default App
