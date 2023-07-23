import { createBrowserRouter, redirect } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { BookPage } from "../pages/BookPage";
import { ListPage } from "../pages/ListPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/book",
        element: <BookPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      } else {
        return null;
      }
    },
  },
]);

export default router;
