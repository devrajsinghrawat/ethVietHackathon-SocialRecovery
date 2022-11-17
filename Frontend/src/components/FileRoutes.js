import { Route, Switch } from "react-router-dom";
import React from "react";

import Login from "./Login";
import AdminDashboard from "./Admin/AdminDashboard";
import { PrivateRoute, ProtectedRoute } from "./RouteComponents";
import Enroll from "./Admin/Enroll";
import Guard from "./Admin/Guard";

const Page404 = () => <h5>Page Not Found 404</h5>;

const FileRoutes = () => {
  return (
    <div className="fileRoutes">
      <Switch>
        <PrivateRoute path="/dashboard" component={AdminDashboard} />
        <PrivateRoute path="/enroll" component={Enroll} />
        <PrivateRoute path="/guard" component={Guard} />

        <ProtectedRoute exact path="/signup" component={Login} />
        <ProtectedRoute exact path="/" component={Login} />

        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
};

export default FileRoutes;
