import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';

export default class ComponentSample extends Component {
    constructor() {
        super();

        this.sampleSnippet = null;
    }

    componentDidMount() {

    }

    render() {
        const sample = this.props.sample;

        return (
            <section className="component-sample" key={sample.title}>
                <div className="component-sample-header">
                    <h3>{sample.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: sample.descHtml }} />
                </div>
                <div className="module">
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
