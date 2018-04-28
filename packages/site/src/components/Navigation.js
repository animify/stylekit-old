import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './../public/images/logotype.svg';
import Constants from './../utils/Constants';

export default class Navigation extends Component {
    state = {
        currentPage: undefined,
    }

    changedPage = () => {
        window.scrollTo(0, 0);
    }

    isHome = () => location.pathname === '/';

    setNav = (currentPage) => {
        this.setState({ currentPage });
    }

    setHome = () => {
        window.scrollTo(0, 0);

        this.setState({
            currentPage: undefined,
        });
    }

    render() {
        const { sections, currentPage } = this.props;

        return (
            <header className="nav menu main header hasborder">
                <div className="container">
                    <div className="set">
                        <Link to="/" onClick={this.setHome} className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></Link>
                        <div className="float-right">
                            <Link to="/components" onClick={this.changedPage} className={!this.isHome() && currentPage === 'components' ? 'item active' : 'item'}>Components</Link>
                            <Link to="/layout" onClick={this.changedPage} className={!this.isHome() && currentPage === 'layout' ? 'item active' : 'item'}>Layout</Link>
                            <Link to="/utility" onClick={this.changedPage} className={!this.isHome() && currentPage === 'utility' ? 'item active' : 'item'}>Utility</Link>
                            <Link to="/variables" onClick={this.changedPage} className={!this.isHome() && currentPage === 'variables' ? 'item active' : 'item'}>Variables</Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};
