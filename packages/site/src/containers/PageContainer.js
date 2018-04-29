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
        section: null
    }

    componentDidMount() {
        Utils.importPage(this.props.guide, this, this.props.match.params.type);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.section !== null) {
            return this.state.section.id !== nextState.section.id;
        } else {
            return true;
        }
    }

    render() {
        const { title, description, guide } = this.props;
        const { section, sections, list } = this.state;
        const GuideComponent = guide === 'variables' ? VariableSection : PageSection;

        console.log('section', section);
        console.log('guide', guide);

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
