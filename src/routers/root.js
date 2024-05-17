import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import UserRouter from "./UserRouter";
import ProductRouter from "./ProductRouter";

const Loading = <div>Loading....</div>;

const Login = lazy(() => import("../pages/user/LoginPage"));

const Main = lazy(() => import("../pages/MainPage"));
const ProductMain = lazy(() => import("../pages/products/MainPage"));
const UserMain = lazy(() => import("../pages/user/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductMain />
      </Suspense>
    ),
    children: ProductRouter(),
  },
  {
    path: "user",
    element: (
      <Suspense fallback={Loading}>
        <UserMain />
      </Suspense>
    ),
    children: UserRouter(),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "logout",
  },
]);

export default root;
