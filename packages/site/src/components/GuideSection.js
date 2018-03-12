import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

export default class GuideSection extends Component {
    constructor() {
        super();

        this.state = {
            showingSnippet: false
        };

        this.sampleSnippet = null;
        this.toggleSnippet = this.toggleSnippet.bind(this);
    }

    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
    }

    render() {
        const sample = this.props.sample;
        const { showingSnippet } = this.state;

        return (
            <section id={`guide-${sample.title.replace(/\s/g, '').toLowerCase()}`} className="guide" key={sample.title}>
                <div className="guide-description">
                    <h2>{sample.title}</h2>
                    <h4 dangerouslySetInnerHTML={{ __html: sample.descHtml }} />
                </div>

                { sample.subsections.map(subsection => (
                    <div className="guide-subsection" key={subsection.title}>
                        <div className="guide-subsection-description">
                            <h4>{subsection.title}</h4>
                            <p>{subsection.subtitle}</p>
                        </div>
                        <div className={showingSnippet ? 'module open' : 'module'}>
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: subsection.snippet }} />
                            </div>
                            { subsection.codeStyle === 'hidden' ? null
                                : <div className="snippet">
                                    <Highlight language="html">
                                        {subsection.snippet}
                                    </Highlight>
                                </div>
                            }
                        </div>
                    </div>
                )) }

            </section>
        );
    }
}

GuideSection.propTypes = {
    sample: PropTypes.shape({
        title: PropTypes.string,
        snippet: PropTypes.string
    }).isRequired
};