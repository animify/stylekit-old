import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ components }) => (
    <header>
        <div className="nav menu main noshadow">
            <div className="container">
                <span className="item logo">Stylekit</span>

                <div className="float-right">
                    <Link to="/components" className="item active">Components</Link>
                    <Link to="/design" className="item">Design</Link>
                    <Link to="/utility" className="item">Utility</Link>
                </div>
            </div>
            {/* <div className="float-right">
                <div className="dropdown hover right">
                    <Link to="/components" className="item active">Components</Link>
                    <span className="toggle">{ currentComponent !== '' ? `: ${currentComponent}` : null }<i data-minicon="chevron-down" /></span>
                    <ul className="menu">
                        { components }
                    </ul>
                </div>
                <div className="dropdown hover right">
                    <Link to="/design" className="item">Design</Link>
                    <span className="toggle"><i data-minicon="chevron-down" /></span>
                    <ul className="menu">
                        {console.log('eeee', design)}
                        { design }
                    </ul>
                </div>

                <div className="dropdown hover right">
                    <Link to="/utility" className="item">Utility</Link>
                    <span className="toggle"><i data-minicon="chevron-down" /></span>
                    <ul className="menu">
                        { utilities }
                    </ul>
                </div>
            </div> */}
        </div>
    </header>
);

Nav.propTypes = {
    components: PropTypes.array.isRequired
};

export default Nav;
