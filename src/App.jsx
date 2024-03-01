import './App.css'
import Homepage from './pages/Home/Homepage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import HelpRequestDetailPage from './pages/HelpRequestDetails/HelpRequestDetailsPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/help_request_details",
    element: <HelpRequestDetailPage />,
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
