import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './../public/images/logotype.svg';
import Constants from './../utils/Constants';
import Utils from '../utils/Utils';

export default class Sidebar extends Component {
    state = {
        selectedSection: undefined,
    }

    componentDidUpdate() {
        let param = this.props.match.params.type;

        if (!param && this.props.sections) {
            param = this.props.sections.list[0].id;
        }

        this.setItem(param);
    }

    focusSection = (section) => {
        this.props.updateCurrentSection(section);
    };

    setItem = (selectedSection) => {
        if (selectedSection === this.state.selectedSection) return;
        this.setState({ selectedSection });
    }

    render() {
        const { selectedSection } = this.state;
        const { sections } = this.props;

        return (
            <div className="list fixed">
                <div className="item header capitalize">
                    <h4>{sections.page}</h4>
                </div>
                {
                    sections.list.length > 0 &&
                    sections.list.map(section => <div key={`section-${section.id}`} className={selectedSection === section.id ? 'item active' : 'item'}><a role="presentation" onClick={() => { this.setItem(section.id); this.focusSection(section); }}>{section.title}</a></div>)
                }
            </div>
        );
    }
};

Sidebar.propTypes = {
    sections: PropTypes.object.isRequired
};
