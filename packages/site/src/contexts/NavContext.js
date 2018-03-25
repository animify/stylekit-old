import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const NavContext = React.createContext('nav');
class NavProvider extends Component {
    state = {
        selectedNav: undefined,
        selectedItem: undefined,
    }

    changedPage = () => {
        this.setState({ selectedItem: undefined });
        window.scrollTo(0, 0);
    }

    setNav = (selectedNav) => {
        this.setState({ selectedNav });
    }

    setItem = (selectedItem) => {
        if (selectedItem === this.state.selectedItem) return;
        this.setState({selectedItem});
    }

    setHome = () => {
        window.scrollTo(0, 0);
        this.setState({
            selectedNav: undefined,
            selectedItem: undefined,
        });
    }

    render() {
        const { selectedNav, selectedItem } = this.state;

        return (
            <NavContext.Provider value={{selectedItem, selectedNav}}>
                <div className="nav menu main header hasborder">
                    <div className="container">
                        {this.props.children({setHome: this.setHome, setItem: this.setItem, setNav: this.setNav, changedPage: this.changedPage})}
                    </div>
                </div>
            </NavContext.Provider>
        );
    }
}

export { NavContext, NavProvider };
