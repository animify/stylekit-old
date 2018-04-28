import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './../public/images/logotype.svg';
import Constants from './../utils/Constants';
import Utils from '../utils/Utils';

export default class Sidebar extends Component {
    state = {
        selectedPage: undefined,
    }

    componentDidUpdate() {
        const param = this.props.match.params.type;

        this.setItem(param);
    }

    focusSection = (section) => {
        console.log('focusing section', section);
        Utils.loadSection(section.page, section).then(section => {
            this.props.updateCurrentSection(section);
            this.props.history.replace(`/${section.page}/${section.id}`);
        });
    };

    setItem = (selectedPage) => {
        if (selectedPage === this.state.selectedPage) return;
        this.setState({ selectedPage });
    }

    render() {
        const { selectedPage } = this.state;
        const { sections } = this.props;

        return (
            <div>
                <div className="item header capitalize">
                    <h4>{sections.page}</h4>
                </div>
                {
                    sections.list.length > 0 &&
                    sections.list.map(section => <div key={`section-${section.folder}`} className={selectedPage === section.folder ? 'item active' : 'item'}><a role="presentation" onClick={() => { this.setItem(section.id); this.focusSection(section); }}>{section.title}</a></div>)
                }
            </div>
        );
    }
};

Sidebar.propTypes = {
    sections: PropTypes.object.isRequired
};
