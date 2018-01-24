import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';

const Router = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/components" component={KitComponents} />
        </div>
    </BrowserRouter>
);

export default Router;
