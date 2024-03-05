import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import './App.css'
import Homepage from './pages/Home/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HelpRequestDetailPage from './pages/HelpRequestDetails/HelpRequestDetailsPage';
import CreateRequestPage from './pages/CreateRequestPage/CreateRequestPage';


const router = createBrowserRouter([
  {
    path: "/messages",
    element: <MessagePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/help_request_details/:requestId",
    element: <HelpRequestDetailPage />,
  },
  {
    path: "create_request",
    element: <CreateRequestPage />,
  },
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App