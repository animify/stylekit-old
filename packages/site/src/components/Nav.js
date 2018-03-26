import React from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import { Link } from 'react-router-dom';
import { NavContext, NavProvider } from './../contexts/NavContext';
import History from './../utils/history';
import logo from './../public/images/logotype.svg';

const Nav = ({ sections, location }) => {
    const isHome = () => location.pathname === '/';

    const focusSection = (section) => {
        scrollToComponent(section.section, { offset: -100, align: 'top', duration: 500 });
        History.replace(`/${section.pageName}/${section.basic}`);
    };

    const getName = (selectionName) => {
        let currentSectionName = null;

        switch (true) {
        case isHome:
            currentSectionName = 'LUL';
            break;
        case selectionName !== undefined:
            currentSectionName = selectionName;
            break;
        case sections.current !== undefined:
            currentSectionName = sections.current;
            break;
        case !selectionName && sections.list.length > 0:
            currentSectionName = sections.list[0].name;
            break;
        default:
            currentSectionName = selectionName;
            break;
        }

        return currentSectionName;
    };

    return (
        <NavProvider>
            {({ setItem, changedPage, setHome }) => (
                <NavContext.Consumer>
                    {({ selectedItem, selectedNav }) => (
                        <div className="set">
                            <Link to="/" onClick={setHome} className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></Link>
                            <div className="dropdown selecteditem" style={{ display: isHome() ? 'none' : null }}>
                                <span className="toggle">{getName(selectedItem)} <i data-minicon="chevron-down" /></span>
                                <ul className="menu">
                                    {sections.list.length > 0 && sections.list.map(section => <li key={`section-${section.name}`}><a role="presentation" onClick={() => { setItem(section.name); focusSection(section); }}>{section.name}</a></li>)}
                                </ul>
                            </div>
                            <div className="float-right">
                                <Link to="/components" onClick={changedPage} className={!isHome() && [selectedNav, sections.page].includes('components') ? 'item active' : 'item'}>Components</Link>
                                <Link to="/layout" onClick={changedPage} className={!isHome() && [selectedNav, sections.page].includes('layout') ? 'item active' : 'item'}>Layout</Link>
                                <Link to="/utility" onClick={changedPage} className={!isHome() && [selectedNav, sections.page].includes('utility') ? 'item active' : 'item'}>Utility</Link>
                                <Link to="/variables" onClick={changedPage} className={!isHome() && [selectedNav, sections.page].includes('variables') ? 'item active' : 'item'}>Variables</Link>
                            </div>
                        </div>
                    )}
                </NavContext.Consumer>
            )}
        </NavProvider>
    );
};

Nav.propTypes = {
    location: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired
};


export default Nav;
