import React, { Component } from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import minicons from 'minicons';
import Utils from './utils/helpers';
import HomeContainer from './containers/Home';
import KitComponents from './containers/KitComponents';
import KitDesign from './containers/KitDesign';
import Nav from './components/Nav';
import Footer from './components/Footer';
import GuideComponents from './../guides/components.json';

export default class Router extends Component {
    constructor() {
        super();

        this.state = {
            ComponentDropdown: GuideComponents.map(c => (<li key={`li-${c.title}`}><Link to={`/components/${c.folder}`} className="capitalize">{c.title}</Link></li>)),
            UtilityDropdown: GuideComponents.map(c => (<li key={`li-${c.title}`}><Link to={`/components/${c.folder}`} className="capitalize">Ut {c.folder}</Link></li>)),
            DesignDropdown: [],
            currentComponent: undefined
        };

        this.updateCurrentComponent = this.updateCurrentComponent.bind(this);
        this.updateNavComponents = this.updateNavComponents.bind(this);
        this.updateDesignComponents = this.updateDesignComponents.bind(this);
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

    updateDesignComponents(componentList) {
        console.log(componentList);
        this.setState({
            DesignDropdown: componentList
        });
    }

    render() {
        const { ComponentDropdown, UtilityDropdown, DesignDropdown, currentComponent } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Nav components={ComponentDropdown} utilities={UtilityDropdown} design={DesignDropdown} currentComponent={currentComponent} />
                    <Route exact path="/" render={() => (<HomeContainer />)} />

                    <Route exact path="/components/:type?" render={props => (<KitComponents {...props} updateNavComponents={this.updateNavComponents} updateCurrentComponent={this.updateCurrentComponent} />)} />

                    <Route exact path="/design/:type?" render={props => (<KitDesign {...props} updateDesignComponents={this.updateDesignComponents} updateCurrentComponent={this.updateCurrentComponent} />)} />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}
