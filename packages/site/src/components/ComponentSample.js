import React from 'react';
import PropTypes from 'prop-types';

const ComponentSample = ({ sample }) => (
    <section className="component-sample" key={sample.title}>
        <div className="component-sample-header">
            <h3>{sample.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: sample.descHtml }} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: sample.snippet }} />
        <code className="component-sample-snippet">
            <pre>
                {sample.snippet}
            </pre>
        </code>
    </section>
);

ComponentSample.propTypes = {
    sample: PropTypes.shape({
        title: PropTypes.string,
        snippet: PropTypes.string
    }).isRequired
};

export default ComponentSample;
