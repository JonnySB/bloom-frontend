import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Index } from "./pages/Index/Index";
import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    path: "/",
    element: <Index />
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
