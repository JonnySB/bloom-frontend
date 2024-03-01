import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ReceivedOffers from "./pages/ManageHelpRequest/ReceivedOffers/ReceivedOffers";

const router = createBrowserRouter([
  {
    path: "/something",
    element: <ReceivedOffers />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
