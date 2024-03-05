import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";


import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";

const router = createBrowserRouter([
  {
    path: "/messages",
    element: <MessagePage />,
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
