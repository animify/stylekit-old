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
            <section className="component-sample" key={sample.title}>
                <div className="component-sample-header">
                    <h3>{sample.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: sample.descHtml }} />
                </div>
                <div className={showingSnippet ? 'module open' : 'module'}>
                    <span className="toggle" role="presentation" onClick={ this.toggleSnippet}>{ showingSnippet ? 'Hide snippet' : 'Show snippet' }</span>
                    <div className="content">
                        <div dangerouslySetInnerHTML={{ __html: sample.snippet }} />
                    </div>
                    <div className="snippet">
                        <pre>
                            <Highlight language="html">
                                {sample.snippet}
                            </Highlight>
                        </pre>
                    </div>
                </div>

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
