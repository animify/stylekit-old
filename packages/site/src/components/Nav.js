import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
    <header>
        <div className="basic menu">
            <div className="container">
                <Link to="/components" className="item active">Components</Link>
                <Link to="/design" className="item">Design</Link>
                <Link to="/utility" className="item">Utility</Link>
            </div>
        </div>
    </header>
);

export default Nav;
