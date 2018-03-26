import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import GuideSection from './../components/GuideSection';
import Utils from './../utils/helpers';

export default class PageContainer extends Component {
    state = {
        guides: []
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
            scrollToComponent(this[Utils.cleanString(this.props.match.params.type)], { offset: -100, align: 'top', duration: 1 });
        }
    }

    render() {
        const { title, description } = this.props;
        const { guides, list } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>{title}</h1>
                        <h3>{description}</h3>
                    </div>
                    {guides.map(sample => <GuideSection ref={(section) => { this[Utils.cleanString(sample.folder)] = section; }} key={`sample-${sample.title}`} sample={sample} />)}
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
