import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Citizens from "./core/Citizens";
import Patients from "./core/Patients";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Profile from "./core/Profile";
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/citizens" exact component={Citizens} />
                <PrivateRoute path="/patient" exact component={Patients} />
                <PrivateRoute path="/profile" exact component={Profile} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;