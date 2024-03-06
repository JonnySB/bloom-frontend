import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/SignupPage";
import { MyPlants } from "./pages/MyPlants/MyPlants"
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/MyPlants/MyPlants.css"
import { Profile } from "./pages/Profile/ProfilePage";import { Index } from "./pages/Index/Index";
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
    path: "/myplants",
    element: <MyPlants />
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
