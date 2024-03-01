import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessagePage } from "./pages/MessagePage";

import './App.css'

const router = createBrowserRouter([
  {
    path: "/messages",
    element: <MessagePage />,
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