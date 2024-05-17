import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ProductsList = lazy(() => import("../pages/products/ListPage"));
const ProductsDetails = lazy(() => import("../pages/products/Details"));
const MyProducts = lazy(() => import("../pages/products/UserProductList"));
const Register = lazy(() => import("../pages/products/RegisterPage"));

const ProductRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to='/products/list' />,
    },
    {
      path: "productions/:productId",
      element: (
        <Suspense fallback={Loading}>
          <ProductsDetails />
        </Suspense>
      ),
    },
    {
      ///products/asdf
      path: ":userId",
      element: (
        <Suspense fallback={Loading}>
          <MyProducts />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={Loading}>
          <Register />
        </Suspense>
      ),
    },
  ];
};

export default ProductRouter;
