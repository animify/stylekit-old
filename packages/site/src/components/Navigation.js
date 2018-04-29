import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './../public/images/logotype.svg';
import Constants from './../utils/Constants';

export default class Navigation extends Component {
    changedPage = () => {
        window.scrollTo(0, 0);
    }

    render() {
        const { guide } = this.props;

        return (
            <header className="nav menu main header hasborder">
                <div className="container">
                    <div className="set">
                        <Link to="/" onClick={this.setHome} className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></Link>
                        <div className="float-right">
                            <Link to="/components" onClick={this.changedPage} className={guide === 'components' ? 'item active' : 'item'}>Components</Link>
                            <Link to="/layout" onClick={this.changedPage} className={guide === 'layout' ? 'item active' : 'item'}>Layout</Link>
                            <Link to="/utility" onClick={this.changedPage} className={guide === 'utility' ? 'item active' : 'item'}>Utility</Link>
                            <Link to="/variables" onClick={this.changedPage} className={guide === 'variables' ? 'item active' : 'item'}>Variables</Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};
