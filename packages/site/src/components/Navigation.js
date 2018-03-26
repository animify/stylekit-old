import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import History from './../utils/history';
import logo from './../public/images/logotype.svg';

export default class Navigation extends Component {
    state = {
        selectedSection: undefined,
        selectedPage: undefined,
    }

    changedPage = () => {
        this.setState({ selectedPage: undefined });
        window.scrollTo(0, 0);
    }

    isHome = () => location.pathname === '/';

    focusSection = (section) => {
        scrollToComponent(section.section, { offset: -100, align: 'top', duration: 500 });
        History.replace(`/${section.pageName}/${section.id}`);
    };

    setNav = (selectedSection) => {
        this.setState({ selectedSection });
    }

    setItem = (selectedPage) => {
        if (selectedPage === this.state.selectedPage) return;
        this.setState({selectedPage});
    }

    setHome = () => {
        window.scrollTo(0, 0);
        this.setState({
            selectedSection: undefined,
            selectedPage: undefined,
        });
    }

    getName = (selectionName) => {
        let currentSectionName = null;
        const sections = this.props.sections;

        switch (true) {
        case this.isHome():
            currentSectionName = 'LUL';
            break;
        case selectionName !== undefined:
            currentSectionName = selectionName;
            break;
        case sections.current !== undefined:
            currentSectionName = sections.current;
            break;
        case !selectionName && sections.list.length > 0:
            currentSectionName = sections.list[0].title;
            break;
        default:
            currentSectionName = selectionName;
            break;
        }

        return currentSectionName;
    };

    render() {
        const { selectedSection, selectedPage } = this.state;
        const { sections } = this.props;

        return (
            <div className="nav menu main header hasborder">
                <div className="container">
                    <div className="set">
                        <Link to="/" onClick={this.setHome} className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></Link>
                        <div className="dropdown selecteditem" style={{ display: this.isHome() ? 'none' : null }}>
                            <span className="toggle">{this.getName(selectedPage)} <i data-minicon="chevron-down" /></span>
                            <ul className="menu">
                                {sections.list.length > 0 && sections.list.map(section => <li key={`section-${section.title}`}><a role="presentation" onClick={() => { this.setItem(section.title); this.focusSection(section); }}>{section.title}</a></li>)}
                            </ul>
                        </div>
                        <div className="float-right">
                            <Link to="/components" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('components') ? 'item active' : 'item'}>Components</Link>
                            <Link to="/layout" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('layout') ? 'item active' : 'item'}>Layout</Link>
                            <Link to="/utility" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('utility') ? 'item active' : 'item'}>Utility</Link>
                            <Link to="/variables" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('variables') ? 'item active' : 'item'}>Variables</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

Navigation.propTypes = {
    sections: PropTypes.object.isRequired
};
