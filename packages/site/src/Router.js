import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import Nav from './components/Nav';

export default class Router extends Component {
    constructor() {
        super();

        this.state = {
            navComponents: []
        };

        this.updateNavComponents = this.updateNavComponents.bind(this);
    }

    updateNavComponents(componentList) {
        console.log(componentList);
        this.setState({
            navComponents: componentList
        });
    }

    render() {
        const { navComponents } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Nav components={navComponents} />
                    <Route exact path="/" render={() => (<HomeContainer />)} />
                    <Route exact path="/components/:type?" render={props => (<KitComponents {...props} updateNavComponents={this.updateNavComponents} />)} />
                </div>
            </BrowserRouter>
        );
    }
}
