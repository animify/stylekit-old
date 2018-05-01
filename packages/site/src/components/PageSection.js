import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import markup from 'react-syntax-highlighter/languages/prism/markup';

registerLanguage('markup', markup);

export default class PageSection extends Component {
    constructor() {
        super();

        this.state = {
            showingSnippet: false
        };

        this.toggleSnippet = this.toggleSnippet.bind(this);
    }

    componentDidMount() {
        if (this.props.section && this.props.section.id === 'progress') {
            window.stylekit.components.progress.load();
            window.stylekit.components.progress.loadActive();
        }
    }

    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
    }

    render() {
        const { section, className } = this.props;
        const { showingSnippet } = this.state;
        const lnStyle = {
            position: 'absolute',
            backgroundColor: '#f4f6f7',
            color: '#999',
            width: '40px',
            boxShadow: 'none',
            borderRadius: '4px 0 0 4px',
            textAlign: 'right',
            zIndex: 10,
        }
        return (
            <section className={`guide ${className}`}>
                <div className="guide-description">
                    <h2>{section.title}</h2>
                    <h5 dangerouslySetInnerHTML={{ __html: section.descHtml }} />
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
                                    <SyntaxHighlighter language="markup" lineNumberContainerStyle={lnStyle} useInlineStyles={false} showLineNumbers>
                                        {subsection.displaySnippet}
                                    </SyntaxHighlighter>
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
