import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import minicons from 'minicons';
import Utils from './utils/helpers';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import KitDesign from './containers/KitDesign';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default class Router extends Component {
    constructor() {
        super();

        this.state = {
            NavComponents: []
        };

        this.updateNavComponents = this.updateNavComponents.bind(this);
    }

    componentDidMount() {
        minicons.setOptions({
            observe: true,
            config: {
                name: 'feedlist-icons',
                props: {
                    stroke: 'rgba(0, 0, 31, .6)'
                }
            }
        });
        minicons.swap();
    }

    updateNavComponents(componentList) {
        this.setState({
            NavComponents: componentList
        });
    }

    render() {
        const { NavComponents } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Nav components={NavComponents} />

                    <Route exact path="/" render={() => (<HomeContainer />)} />

                    <Route exact path="/components/:type?" render={props => (<KitComponents {...props} updateNav={this.updateNavComponents} />)} />

                    <Route exact path="/design/:type?" render={props => (<KitDesign {...props} updateNav={this.updateNavComponents} />)} />
                </div>
            </BrowserRouter>
        );
    }
}
