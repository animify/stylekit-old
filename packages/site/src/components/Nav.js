import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ components, utilities, currentComponent }) => (
    <header>
        <div className="nav menu">
            <div className="container">
                <div className="float-left">
                    <span className="item">Stylekit</span>
                </div>
                <div className="float-right">
                    <div className="dropdown right">
                        <Link to="/components" className="item active">Components</Link>
                        <span className="toggle">{ currentComponent !== '' ? `: ${currentComponent}` : null }^</span>
                        <ul className="menu">
                            { components }
                        </ul>
                    </div>
                    <div className="dropdown right">
                        <Link to="/design" className="item">Design</Link>
                        <span className="toggle">&nbsp; ^ &nbsp;</span>
                        <ul className="menu">
                            { utilities }
                        </ul>
                    </div>

                    <Link to="/utility" className="item">Utility</Link>
                </div>
            </div>
        </div>
    </header>
);

Nav.defaultProps = {
    currentComponent: ''
};

Nav.propTypes = {
    components: PropTypes.array.isRequired,
    utilities: PropTypes.array.isRequired,
    currentComponent: PropTypes.string
};

export default Nav;
