import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import minicons from 'minicons';
import Utils from './utils/helpers';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import KitDesign from './containers/KitDesign';
import KitVariables from './containers/KitVariables';
import Nav from './components/Nav';
import Footer from './components/Footer';

export default class Router extends Component {
    constructor() {
        super();

        this.state = {
            NavSections: []
        };

        this.updateNavDropdown = this.updateNavDropdown.bind(this);
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

    updateNavDropdown(componentList) {
        this.setState({
            NavSections: componentList
        });
    }

    render() {
        const { NavSections } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Nav sections={NavSections} />

                    <Route exact path="/" render={() => (<HomeContainer />)} />

                    <Route exact path="/components/:type?" render={props => (<KitComponents {...props} updateNavDropdown={this.updateNavDropdown} />)} />

                    <Route exact path="/design/:type?" render={props => (<KitDesign {...props} updateNavDropdown={this.updateNavDropdown} />)} />

                    <Route exact path="/variables/:type?" render={props => (<KitVariables {...props} updateNavDropdown={this.updateNavDropdown} />)} />
                </div>
            </BrowserRouter>
        );
    }
}
