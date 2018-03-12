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

        console.log(selectedItemName);
        return selectedItemName;
    };

    return (
        <NavProvider>
            {({ setItem }) => (
                <NavContext.Consumer>
                    {selectedItem => (
                        <div className="dropdown selecteditem">
                            <span className="toggle">{getName(selectedItem)} <i data-minicon="chevron-down" /></span>
                            <ul className="menu">
                                {sections.list.length > 0 && sections.list.map(section => <li key={`section-${section.name}`}><a role="presentation" onClick={() => { setItem(section.name); setFocusedSection(section); }}>{section.name}</a></li>)}
                            </ul>
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
