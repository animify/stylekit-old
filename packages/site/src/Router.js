import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';
import KitVariables from './containers/KitVariables';
import PageLayout from './containers/PageLayout';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={() => (<HomeContainer />)} />

                    <Route exact path="/components/:type?" render={props => (<PageLayout {...props} guide="components" title="Components" description="Components do this and that this and that this and that this and that this and that this and that." />)} />

                    <Route exact path="/layout/:type?" render={props => (<PageLayout {...props} guide="layout" title="Layout" description="Components do this and that this and that this and that this and that this and that this and that." />)} />

                    <Route exact path="/utility/:type?" render={props => (<PageLayout {...props} guide="utility" title="Utility" description="Components do this and that this and that this and that this and that this and that this and that." />)} />

                    <Route exact path="/variables/:type?" render={props => (<KitVariables {...props} updateNavDropdown={this.updateNavDropdown} />)} />
                </div>
            </BrowserRouter>
        );
    }
}
