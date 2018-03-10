import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './../public/images/logotype.svg';

const NavContext = React.createContext('nav');
class NavProvider extends Component {
    state = {
        selectedNav: 'components',
        selectedItem: '',
    }

    toggleNav = (selectedNav) => {
        this.setState({ selectedNav });
    }

    setItem = (selectedItem) => {
        if (selectedItem === this.state.selectedItem) return;
        this.setState({selectedItem});
    }

    render() {
        const { selectedNav, selectedItem } = this.state;

        return (
            <NavContext.Provider value={selectedNav}>
                <div className="nav menu main header hasborder">
                    <div className="container">
                        <span className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></span>
                        <div className="dropdown selecteditem">
                            <span className="toggle">{selectedItem}<i data-minicon="chevron-down" /></span>
                            {this.props.children({setItem: this.setItem})}
                        </div>
                        <div className="float-right">
                            <Link to="/components" onClick={() => this.toggleNav('components')} className={ selectedNav === 'components' ? 'item active': 'item'}>Components</Link>
                            <Link to="/design" onClick={() => this.toggleNav('design')} className={ selectedNav === 'design' ? 'item active': 'item'}>Design</Link>
                            <Link to="/utility" onClick={() => this.toggleNav('utility')} className={ selectedNav === 'utility' ? 'item active': 'item'}>Utility</Link>
                        </div>
                    </div>
                </div>

            </NavContext.Provider>
        );
    }
}

export { NavContext, NavProvider };
