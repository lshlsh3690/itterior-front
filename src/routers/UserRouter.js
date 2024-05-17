import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const Details = lazy(() => import("../pages/user/DetailsPage"));
const Register = lazy(() => import("../pages/user/RegisterPage"));

const UserRouter = () => {
  return [
    {
      path: "details/:userId",
      element: (
        <Suspense fallback={Loading}>
          <Details />
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

export default UserRouter;
