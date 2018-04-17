import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

export default class PageSection extends Component {
    constructor() {
        super();

        this.state = {
            showingSnippet: false
        };

        this.toggleSnippet = this.toggleSnippet.bind(this);
    }

    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
    }

    render() {
        const { section, className } = this.props;
        const { showingSnippet } = this.state;

        return (
            <section className={`guide ${className}`}>
                <div className="guide-description">
                    <h2>{section.title}</h2>
                    <h4 dangerouslySetInnerHTML={{ __html: section.descHtml }} />
                </div>

                { section.subsections.map(subsection => (
                    <div className="guide-subsection" key={subsection.title}>
                        <div className="guide-subsection-description">
                            <h4>{subsection.title}</h4>
                            <p>{subsection.subtitle}</p>
                        </div>
                        <div className={showingSnippet ? 'module open' : 'module'}>
                            <div className="content">
                                <div className={subsection.class ? subsection.class : null} dangerouslySetInnerHTML={{ __html: subsection.snippet }} />
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

PageSection.defaultProps = {
    className: null,
};

PageSection.propTypes = {
    className: PropTypes.string,
    section: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        descHtml: PropTypes.string,
        snippet: PropTypes.string
    }).isRequired
};
