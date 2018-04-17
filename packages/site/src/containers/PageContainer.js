import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/Utils';
import Constants from './../utils/Constants';
import PageSection from './../components/PageSection';
import VariableSection from './../components/VariableSection';
import PageLoader from './../components/PageLoader';

export default class PageContainer extends Component {
    state = {
        sections: [],
        currentSectionName: this.props.match.params.type
    }

    componentDidMount() {
        Utils.importPage(this.props.guide, this, this.props.match.params.type);
    }

    componentDidUpdate() {
        if (!this.props.match.params.type) {
            const section = this.state.sections[0];
            this.setState({currentSectionName: section.id})
            this.props.history.replace(`${this.props.match.url}/${section.id}`);
        }
    }

    render() {
        const { title, description, guide } = this.props;
        const { sections, list, currentSectionName } = this.state;
        const GuideComponent = guide === 'variables' ? VariableSection : PageSection;
        const currentSection = sections.find(section => currentSectionName === section.id);

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>{title}</h1>
                        <h3>{description}</h3>
                    </div>
                        { currentSection ?
                            <GuideComponent key={`sample-${currentSection.id}`} section={currentSection} />
                            : <div className="loaders">
                                <PageLoader />
                                <PageLoader />
                            </div>
                        }
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
