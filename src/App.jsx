import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/LoginPage";
import { Signup } from "./pages/Signup/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "./pages/Profile/ProfilePage";

import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";

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
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
