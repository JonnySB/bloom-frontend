import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/LoginPage";
import { Signup } from "./pages/Signup/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "./pages/Profile/ProfilePage";

import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";
import './App.css'
import Homepage from './pages/Home/Homepage';
import HelpRequestDetailPage from './pages/HelpRequestDetails/HelpRequestDetailsPage';
import CreateRequestPage from './pages/CreateRequestPage/CreateRequestPage';


const router = createBrowserRouter([
  {
    path: "/messages",
    element: <MessagePage />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/something",
    element: <ReceivedOffersPage />,
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

export default App;
