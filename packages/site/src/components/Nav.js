import React from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import { NavContext, NavProvider } from './../contexts/NavContext';
import History from './../utils/history';

const Nav = ({ components }) => {
    const setFocusedSection = (section) => {
        scrollToComponent(section.component, { offset: -100, align: 'top', duration: 500 });
        History.replace(`/components/${section.folder}`);
    };

    return (
        <NavProvider>
            {({ setItem }) => (
                <NavContext.Consumer>
                    {selectedItem => (
                        <div className="dropdown selecteditem">
                            <span className="toggle">{selectedItem === null && components.length > 0 ? components[0].title : selectedItem} <i data-minicon="chevron-down" /></span>
                            <ul className="menu">
                                {components.length > 0 && components.map(component => <li key={`component-${component.title}`}><a role="presentation" onClick={() => { setItem(component.title); setFocusedSection(component); }}>{component.title}</a></li>)}
                            </ul>
                        </div>
                    )}
                </NavContext.Consumer>
            )}
        </NavProvider>
    );
};

Nav.propTypes = {
    components: PropTypes.array.isRequired
};


export default Nav;
