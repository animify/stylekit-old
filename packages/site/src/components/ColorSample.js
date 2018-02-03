import React from 'react';
import PropTypes from 'prop-types';

const ColorSample = ({ colorName, colorString }) => (
    <div className="col xs-12 m-3">
        <div className="sample">
            <div className="color" style={{ backgroundColor: colorString }} />
            <div className="desc">
                <p><strong>{colorName}</strong></p>
                <small>{colorString}</small>
            </div>
        </div>
    </div>
);

ColorSample.propTypes = {
    colorName: PropTypes.string.isRequired,
    colorString: PropTypes.string.isRequired,
};

export default ColorSample;
