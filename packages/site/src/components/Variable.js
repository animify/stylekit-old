import React from 'react';
import PropTypes from 'prop-types';

const Variable = ({ varName, varStyle }) => (
    <div className="col xs-12">
        <div className="sample color">
            <span style={{ backgroundColor: varStyle }}>
                <p>{varName}</p>
                <small>{varStyle}</small>
            </span>
        </div>
    </div>
);

Variable.propTypes = {
    varName: PropTypes.string.isRequired,
    varStyle: PropTypes.string.isRequired,
};

export default Variable;
