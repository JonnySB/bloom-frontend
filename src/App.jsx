import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/LoginPage";
import { Signup } from "./pages/Signup/SignupPage";
import { Profile } from "./pages/Profile/ProfilePage";

import './App.css'

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

export default App