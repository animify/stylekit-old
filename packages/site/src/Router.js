import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';

const Router = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={HomeContainer} />
        </div>
    </BrowserRouter>
);

export default Router;
