import React from 'react';
import PropTypes from 'prop-types';

const TypographySample = ({ typographyName, typographySize }) => (
    <div className="col xs-12">
        <div className="sample typography">
            <div className="desc">
                <span style={{ fontSize: typographySize }}><strong>Quest judge wizard bonks foxy chimp love.</strong></span>
                <p><strong>{typographyName}</strong> - {typographySize}</p>
            </div>
        </div>
    </div>
);

TypographySample.propTypes = {
    typographyName: PropTypes.string.isRequired,
    typographySize: PropTypes.string.isRequired
};

export default TypographySample;
