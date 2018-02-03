import React from 'react';
import PropTypes from 'prop-types';

const ColorSample = ({ colorName, colorString }) => (
    <div className="sample">
        <h5>{colorString}</h5>
        <p>{colorName}</p>
    </div>
);

ColorSample.propTypes = {
    colorName: PropTypes.string.isRequired,
    colorString: PropTypes.string.isRequired,
};

export default ColorSample;
