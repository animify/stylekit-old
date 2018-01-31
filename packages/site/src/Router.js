import React, { Component } from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import Nav from './components/Nav';
import GuideComponents from './../guides/components.json';
import colors from './definitions/colors';

export default class Router extends Component {
    constructor() {
        super();
        console.log(colors);
        console.log(colors.colorBlack());

        this.state = {
            ComponentDropdown: GuideComponents.map(c => (<li key={`li-${c.title}`}><Link to={`/components/${c.folder}`} className="capitalize">{c.title}</Link></li>)),
            UtilityDropdown: GuideComponents.map(c => (<li key={`li-${c.title}`}><Link to={`/components/${c.folder}`} className="capitalize">Ut {c.folder}</Link></li>)),
            currentComponent: undefined
        };

        this.updateCurrentComponent = this.updateCurrentComponent.bind(this);
        this.updateNavComponents = this.updateNavComponents.bind(this);
    }

    updateCurrentComponent(currentComponent) {
        this.setState({
            currentComponent
        });
    }

    updateNavComponents(componentList) {
        this.setState({
            ComponentDropdown: componentList
        });
    }

    render() {
        const { ComponentDropdown, UtilityDropdown, currentComponent } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Nav components={ComponentDropdown} utilities={UtilityDropdown} currentComponent={currentComponent} />
                    <Route exact path="/" render={() => (<HomeContainer />)} />
                    <Route exact path="/components/:type?" render={props => (<KitComponents {...props} updateNavComponents={this.updateNavComponents} updateCurrentComponent={this.updateCurrentComponent} />)} />
                </div>
            </BrowserRouter>
        );
    }
}
