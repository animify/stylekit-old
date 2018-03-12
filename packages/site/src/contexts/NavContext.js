import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './../public/images/logotype.svg';

const NavContext = React.createContext('nav');
class NavProvider extends Component {
    state = {
        selectedNav: 'components',
        selectedItem: undefined,
    }

    toggleNav = (selectedNav) => {
        this.setState({ selectedNav, selectedItem: undefined });
    }

    setItem = (selectedItem) => {
        if (selectedItem === this.state.selectedItem) return;
        this.setState({selectedItem});
    }

    render() {
        const { selectedNav, selectedItem } = this.state;

        return (
            <NavContext.Provider value={selectedItem}>
                <div className="nav menu main header hasborder">
                    <div className="container">
                        <span className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></span>
                        {this.props.children({setItem: this.setItem})}
                        <div className="float-right">
                            <Link to="/components" onClick={() => this.toggleNav('components')} className={ selectedNav === 'components' ? 'item active': 'item'}>Components</Link>
                            <Link to="/layout" onClick={() => this.toggleNav('layout')} className={ selectedNav === 'layout' ? 'item active': 'item'}>Layout</Link>
                            <Link to="/variables" onClick={() => this.toggleNav('variables')} className={ selectedNav === 'variables' ? 'item active': 'item'}>Variables</Link>
                            <Link to="/utility" onClick={() => this.toggleNav('utility')} className={ selectedNav === 'utility' ? 'item active': 'item'}>Utility</Link>
                        </div>
                    </div>
                </div>

            </NavContext.Provider>
        );
    }
}

export { NavContext, NavProvider };
