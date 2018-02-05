import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

export default class ComponentSample extends Component {
    constructor() {
        super();

        this.state = {
            showingSnippet: false
        };

        this.sampleSnippet = null;
        this.toggleSnippet = this.toggleSnippet.bind(this);
    }

    componentDidMount() {

    }

    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
    }

    render() {
        const sample = this.props.sample;
        const { showingSnippet } = this.state;

        return (
            <section id={`component-${sample.title.replace(/\s/g, '').toLowerCase()}`} className="component" key={sample.title}>
                <div className="component-description">
                    <h2>{sample.title}</h2>
                    <h4 dangerouslySetInnerHTML={{ __html: sample.descHtml }} />
                </div>

                { sample.subsections.map(subsection => (
                    <div className="component-subsection" key={subsection.title}>
                        <div className="component-subsection-description">
                            <h4>{subsection.title}</h4>
                            <p>{subsection.subtitle}</p>
                        </div>
                        <div className={showingSnippet ? 'module open' : 'module'}>
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: subsection.snippet }} />
                            </div>
                            <div className="snippet">
                                <span className="type" role="presentation">HTML</span>
                                <Highlight language="html">
                                    {subsection.snippet}
                                </Highlight>
                            </div>
                        </div>
                    </div>
                )) }

            </section>
        );
    }
}

ComponentSample.propTypes = {
    sample: PropTypes.shape({
        title: PropTypes.string,
        snippet: PropTypes.string
    }).isRequired
};
