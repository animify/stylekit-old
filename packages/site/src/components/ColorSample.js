import React from 'react';
import PropTypes from 'prop-types';

const ColorSample = ({ colorName, colorString, dark }) => (
    <div className="col xs-12 m-4">
        <div className="sample color">
            <span className="preview" style={{ backgroundColor: colorString }} />
            <span className="desc">
                <p><strong>{colorName}</strong></p>
                <small>{colorString}</small>
            </span>
        </div>
    </div>
);

ColorSample.propTypes = {
    colorName: PropTypes.string.isRequired,
    colorString: PropTypes.string.isRequired,
    dark: PropTypes.bool.isRequired,
};

export default ColorSample;
