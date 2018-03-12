import React, { Component } from 'react';
import logo from './../public/images/logotype.svg';

const NavContext = React.createContext('nav');
class NavProvider extends Component {
    state = {
        selectedNav: undefined,
        selectedItem: undefined,
    }

    changedPage = (selectedNav) => {
        this.setState({  selectedItem: undefined });
        window.scrollTo(0, 0);
    }

    setNav = (selectedNav) => {
        this.setState({ selectedNav });
    }

    setItem = (selectedItem) => {
        if (selectedItem === this.state.selectedItem) return;
        this.setState({selectedItem});
    }

    render() {
        const { selectedNav, selectedItem } = this.state;

        return (
            <NavContext.Provider value={{selectedItem, selectedNav}}>
                <div className="nav menu main header hasborder">
                    <div className="container">
                        <span className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></span>
                        {this.props.children({setItem: this.setItem, setNav: this.setNav, changedPage: this.changedPage})}
                    </div>
                </div>

            </NavContext.Provider>
        );
    }
}

export { NavContext, NavProvider };
