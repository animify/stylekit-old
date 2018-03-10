import React from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import { NavContext, NavProvider } from './../contexts/NavContext';
import History from './../utils/history';

const Nav = ({ sections }) => {
    const setFocusedSection = (section) => {
        scrollToComponent(section.section, { offset: -100, align: 'top', duration: 500 });
        History.replace(`/${section.pageName}/${section.basic}`);
    };

    return (
        <NavProvider>
            {({ setItem }) => (
                <NavContext.Consumer>
                    {selectedItem => (
                        <div className="dropdown selecteditem">
                            <span className="toggle">{selectedItem === null && sections.length > 0 ? sections[0].name : selectedItem} <i data-minicon="chevron-down" /></span>
                            <ul className="menu">
                                {sections.length > 0 && sections.map(section => <li key={`section-${section.name}`}><a role="presentation" onClick={() => { setItem(section.name); setFocusedSection(section); }}>{section.name}</a></li>)}
                            </ul>
                        </div>
                    )}
                </NavContext.Consumer>
            )}
        </NavProvider>
    );
};

Nav.propTypes = {
    sections: PropTypes.array.isRequired
};


export default Nav;
