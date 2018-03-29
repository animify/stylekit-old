import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeLayout from './containers/HomeLayout';
import PageLayout from './containers/PageLayout';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => (<HomeLayout />)} />

                    <Route exact path="/components/:type?" render={props => (<PageLayout {...props} guide="components" title="Components" description="The atomic building blocks used throughout the design system to create collective containers." />)} />

                    <Route exact path="/layout/:type?" render={props => (<PageLayout {...props} guide="layout" title="Layout" description="Structural units & helpers that make up the responsive & visual foundation of your page." />)} />

                    <Route exact path="/utility/:type?" render={props => (<PageLayout {...props} guide="utility" title="Utility" description="Useful classes & methods that assist in managing elements within a structured layout." />)} />

                    <Route exact path="/variables/:type?" render={props => (<PageLayout {...props} guide="variables" title="Variables" description="A collection of static style variables used universally by the stylekit for components and layout." />)} />
                </div>
            </BrowserRouter>
        );
    }
}
