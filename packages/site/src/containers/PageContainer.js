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
        section: null,
        currentSectionName: this.props.match.params.type
    }

    componentDidMount() {
        Utils.importPage(this.props.guide, this, this.props.match.params.type);
    }

    componentDidUpdate() {
        if (!this.props.match.params.type) {
            const section = this.state.sections[0];
            Utils.loadSection(section.page, section).then(section => {
                this.setState({section});
                this.props.history.replace(`/${section.page}/${section.id}`);
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.section !== null) {
            return this.state.section.folder !== nextState.section.folder;
        } else {
            return true;
        }
    }

    render() {
        const { title, description, guide } = this.props;
        const { section, sections, list, currentSectionName } = this.state;
        const GuideComponent = guide === 'variables' ? VariableSection : PageSection;
        const currentSection = sections.find(section => currentSectionName === section.id);

        console.log('section', section);

        return (
            <div className="body">
                { section !== null ?
                    <GuideComponent key={`sample-${section.id}`} section={section} />
                    : <div className="loaders">
                        <PageLoader />
                        <PageLoader />
                    </div>
                }
            </div>
        );
    }
}

PageContainer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guide: PropTypes.string.isRequired
};
