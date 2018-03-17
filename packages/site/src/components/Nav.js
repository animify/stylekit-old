import React from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import { Link } from 'react-router-dom';
import { NavContext, NavProvider } from './../contexts/NavContext';
import History from './../utils/history';

const Nav = ({ sections }) => {
    const setFocusedSection = (section) => {
        scrollToComponent(section.section, { offset: -100, align: 'top', duration: 500 });
        History.replace(`/${section.pageName}/${section.basic}`);
    };

    const getName = (selectedItem) => {
        let selectedItemName = null;

        switch (true) {
        case selectedItem !== undefined:
            selectedItemName = selectedItem;
            break;
        case sections.current !== undefined:
            selectedItemName = sections.current;
            break;
        case !selectedItem && sections.list.length > 0:
            selectedItemName = sections.list[0].name;
            break;
        default:
            selectedItemName = selectedItem;
            break;
        }

        return selectedItemName;
    };

    return (
        <NavProvider>
            {({ setItem, changedPage }) => (
                <NavContext.Consumer>
                    {({ selectedItem, selectedNav }) => (
                        <div className="set">
                            <div className="dropdown selecteditem">
                                <span className="toggle">{getName(selectedItem)} <i data-minicon="chevron-down" /></span>
                                <ul className="menu">
                                    {sections.list.length > 0 && sections.list.map(section => <li key={`section-${section.name}`}><a role="presentation" onClick={() => { setItem(section.name); setFocusedSection(section); }}>{section.name}</a></li>)}
                                </ul>
                            </div>
                            <div className="float-right">
                                <Link to="/components" onClick={changedPage} className={[selectedNav, sections.page].includes('components') ? 'item active' : 'item'}>Components</Link>
                                <Link to="/layout" onClick={changedPage} className={[selectedNav, sections.page].includes('layout') ? 'item active' : 'item'}>Layout</Link>
                                <Link to="/utility" onClick={changedPage} className={[selectedNav, sections.page].includes('utility') ? 'item active' : 'item'}>Utility</Link>
                                <Link to="/variables" onClick={changedPage} className={[selectedNav, sections.page].includes('variables') ? 'item active' : 'item'}>Variables</Link>
                            </div>
                        </div>
                    )}
                </NavContext.Consumer>
            )}
        </NavProvider>
    );
};

Nav.propTypes = {
    sections: PropTypes.object.isRequired
};


export default Nav;
