import React from 'react';
import PropTypes from 'prop-types';

const ColorSample = ({ colorName, colorString, dark }) => (
    <div className="col xs-12 m-4">
        <div className={dark ? 'dark sample color' : 'sample color'} style={{ backgroundColor: colorString }}>
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
    dark: PropTypes.bool.isRequired,
};

export default ColorSample;
