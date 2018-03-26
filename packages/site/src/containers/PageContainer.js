import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import SectionComponent from './../components/SectionComponent';
import Utils from './../utils/helpers';
import Constants from './../utils/Constants';

export default class PageContainer extends Component {
    state = {
        sections: []
    }

    componentDidMount() {
        Utils.importPage(this.props.guide, this, this.props.match.params.type);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }


    componentDidUpdate() {
        if (this.props.match.params.type) {
            scrollToComponent(this[Utils.cleanString(this.props.match.params.type)], Constants.scrollOptionsPageLoad);
        }
    }

    render() {
        const { title, description } = this.props;
        const { sections, list } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>{title}</h1>
                        <h3>{description}</h3>
                    </div>
                    {sections.map(section => <SectionComponent ref={(component) => { this[Utils.cleanString(section.folder)] = component; }} key={`sample-${section.title}`} section={section} />)}
                </div>
            </section>
        );
    }
}

PageContainer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guide: PropTypes.string.isRequired
};
