import './App.css'
import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
