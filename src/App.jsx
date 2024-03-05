import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";


import './App.css'

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
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App