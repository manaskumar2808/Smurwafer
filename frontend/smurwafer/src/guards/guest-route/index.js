import React from 'react';
import { Route } from 'react-router-dom';

const GuestRoute = ({ children, ...props }) => {
    return (
        <Route {...props}>
            {children}
        </Route>
    );
}

export default GuestRoute;