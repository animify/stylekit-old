import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, BrowserRouter } from 'react-router-dom';
import minicons from 'minicons';
import Utils from './utils/helpers';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import KitLayout from './containers/KitLayout';
import KitUtility from './containers/KitUtility';
import KitVariables from './containers/KitVariables';
import PageLayout from './containers/PageLayout';
import Nav from './components/Nav';

export default class Router extends Component {
    constructor() {
        super();

        this.state = {
            NavSections: {
                current: undefined,
                list: []
            }
        };

        this.updateNavDropdown = this.updateNavDropdown.bind(this);
    }

    componentWillMount() {
        minicons.setOptions({
            observe: true,
            config: {
                name: 'feedlist-icons',
                props: {
                    stroke: 'rgba(0, 0, 0, .6)'
                }
            }
        });
    }

    componentDidMount() {
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
                    {/* <NavWithRouter sections={NavSections} /> */}

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

const NavWithRouter = withRouter(Nav);
