import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Favorites from "../pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "job/:id", element: <JobDetails/> },
      { path: "/favorites", element: <Favorites/> },
    ],
  },
]);

export default router;
