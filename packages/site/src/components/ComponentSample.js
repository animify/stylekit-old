import React from 'react';
import PropTypes from 'prop-types';

const ComponentSample = ({ sample }) => (
    <section key={sample.title}>
        <div dangerouslySetInnerHTML={{ __html: sample.snippet }} />
        <pre>
            {sample.snippet}
        </pre>
    </section>
);

ComponentSample.propTypes = {
    sample: PropTypes.shape({
        title: PropTypes.string,
        snippet: PropTypes.string
    })
};

export default ComponentSample;
