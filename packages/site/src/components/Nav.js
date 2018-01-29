import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ children }) => (
    <header>
        <div className="basic menu">
            <div className="container">
                <div className="float-left">
                    <span className="item">Stylekit</span>
                </div>
                <div className="float-right">
                    { children }

                    <Link to="/design" className="item">Design</Link>
                    <Link to="/utility" className="item">Utility</Link>
                </div>
            </div>
        </div>
    </header>
);


export default Nav;
