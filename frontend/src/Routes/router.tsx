import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Register from "../Users/Register.tsx";
import Login from "../Users/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
