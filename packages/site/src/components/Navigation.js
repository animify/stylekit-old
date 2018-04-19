import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './../public/images/logotype.svg';
import Constants from './../utils/Constants';

export default class Navigation extends Component {
    state = {
        selectedSection: undefined,
        selectedPage: undefined,
    }

    changedPage = () => {
        this.setState({ selectedPage: undefined });
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        const param = this.props.match.params.type;

        console.log(param);
        this.setItem(param);
    }

    isHome = () => location.pathname === '/';

    focusSection = (section) => {
        this.props.updateCurrentSection(section.id);
        this.props.history.replace(`/${section.pageName}/${section.id}`);
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
            currentSectionName = undefined;
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
            <div>
                <header className="nav menu main header hasborder">
                    <div className="container">
                        <div className="set">
                            <Link to="/" onClick={this.setHome} className="item logo"><img src={logo} height="24" alt="Stylekit primary logo" /></Link>
                            <div className="float-right">
                                <Link to="/components" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('components') ? 'item active' : 'item'}>Components</Link>
                                <Link to="/layout" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('layout') ? 'item active' : 'item'}>Layout</Link>
                                <Link to="/utility" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('utility') ? 'item active' : 'item'}>Utility</Link>
                                <Link to="/variables" onClick={this.changedPage} className={!this.isHome() && [selectedSection, sections.page].includes('variables') ? 'item active' : 'item'}>Variables</Link>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="list">
                    <div className="item header capitalize">
                        <h4>{sections.page}</h4>
                    </div>
                    {sections.list.length > 0 && sections.list.map(section => <div key={`section-${section.id}`} className={selectedPage === section.id ? 'item active' : 'item'}><a role="presentation" onClick={() => { this.setItem(section.id); this.focusSection(section); }}>{section.title}</a></div>)}
                </div>
            </div>
        );
    }
};

Navigation.propTypes = {
    sections: PropTypes.object.isRequired
};
