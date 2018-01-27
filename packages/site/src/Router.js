import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import Nav from './components/Nav';

const Router = () => (
    <BrowserRouter>
        <div>
            <Nav />
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/components" component={KitComponents} />
        </div>
    </BrowserRouter>
);

export default Router;
