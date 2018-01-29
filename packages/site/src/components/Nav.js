import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ components }) => (
    <header>
        <div className="basic menu">
            <div className="container">
                <div className="float-left">
                    <span className="item">Stylekit</span>
                </div>
                <div className="float-right">
                    <div className="dropdown right">
                        <Link to="/components" className="item active toggle">Components</Link>
                        <ul className="menu">
                            { components.map(e => (
                                <li key={e}><Link to={`/components/${encodeURI(e)}`} className="capitalize">{e}</Link></li>
                            )) }
                        </ul>
                    </div>

                    <Link to="/design" className="item">Design</Link>
                    <Link to="/utility" className="item">Utility</Link>
                </div>
            </div>
        </div>
    </header>
);

Nav.propTypes = {
    components: PropTypes.array.isRequired
};

export default Nav;
