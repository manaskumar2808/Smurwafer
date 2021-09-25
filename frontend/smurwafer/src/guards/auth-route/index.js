import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ children, ...props }) => {
    const isAuthenticated = useSelector(state => state.ath.token !== null);

    if (!isAuthenticated) {
        return <Redirect to={"/login"} />
    }

    return (
        <Route {...props}>
            {children}
        </Route>
    );
}

export default AuthRoute;