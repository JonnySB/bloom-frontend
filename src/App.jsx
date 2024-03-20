import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/Message/MessagePage";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/SignupPage";
import { MyPlants } from "./pages/MyPlants/MyPlants"
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/MyPlants/MyPlants.css"
import { Profile } from "./pages/Profile/ProfilePage"; 
import { Index } from "./pages/Index/Index";
import ReceivedOffersPage from "./pages/ManageHelpRequestPages/ReceivedOffersPage/ReceivedOffersPage";
import './App.css'
import Homepage from './pages/Home/Homepage';
import HelpRequestDetailPage from './pages/HelpRequestDetails/HelpRequestDetailsPage';
import CreateRequestPage from './pages/CreateRequestPage/CreateRequestPage';
import { UserProvider } from './context/UserContext.jsx';
import MyOffersPage from "./pages/ManageHelpRequestPages/MyOffersPage/MyOffersPage";

const router = createBrowserRouter([
    {
        path: "/messages",
        element: <MessagePage />,
    },
    {
        path: "/Profile/",
        element: <Profile />,
    }, 
    {
        path: "/Profile/user/<userId>",
        element: <Profile />,
    },
    {
        path: "/request_management/received_offers",
        element: <ReceivedOffersPage />,
    },
    {
        path: "/request_management/my_offers",
        element: <MyOffersPage />,
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
        path: "/create_request",
        element: <CreateRequestPage />,
    },
])


function App() {

    return (
        <>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </>
    );
};

export default App;
