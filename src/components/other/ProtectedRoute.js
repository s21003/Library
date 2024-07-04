import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from '../../helpers/authHelper'

function ProtectedRoute({component: Component, ...restOfProps }){
    return(
        <Route
            {...restOfProps}
            render={(props) => isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
}

export default ProtectedRoute;