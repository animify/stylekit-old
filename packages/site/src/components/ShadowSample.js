import React from 'react';
import PropTypes from 'prop-types';

const ShadowSample = ({ shadowName, shadowCSS }) => (
    <div className="col xs-12 m-4">
        <div className="sample shadow text-center" style={{ boxShadow: shadowCSS }}>
            <div className="desc">
                <p><strong>{shadowName}</strong></p>
                <small>{shadowCSS}</small>
            </div>
        </div>
    </div>
);

ShadowSample.propTypes = {
    shadowName: PropTypes.string.isRequired,
    shadowCSS: PropTypes.string.isRequired,
};

export default ShadowSample;
