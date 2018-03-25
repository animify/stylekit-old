import React from 'react';
import PropTypes from 'prop-types';

const buildByDisplayStyle = (varName, varStyle, varPropertyCss, displayStyle) => {
    switch (displayStyle) {
    case 'color':
        return (<div className="inner">
            <span className="style" style={{ backgroundColor: varStyle }} />
            <span className="about">
                <strong>{varName}</strong>
                <small>{varStyle}</small>
            </span>
        </div>);
    case 'text':
        return (<div className="inner">
            <h4 className="style" style={{ [varPropertyCss]: varStyle }}>Quick fox jumps over MO</h4>
            <span className="about">
                <strong>{varName}</strong>
                <small>{varStyle}</small>
            </span>
        </div>);
    case 'shape':
        return (<div className="inner">
            <span className="style" style={{ [varPropertyCss]: varStyle }} />
            <span className="about">
                <strong>{varName}</strong>
                <small>{varStyle}</small>
            </span>
        </div>);
    default:
        return (<span style={{ [varPropertyCss]: varStyle }}>
            <p>{varName}</p>
            <small>{varStyle}</small>
        </span>);
    }
};

const Variable = ({ varName, varStyle, varPropertyCss, displayStyle }) => (
    <div className={`variable-sample col xs-12 ${displayStyle}`}>
        { buildByDisplayStyle(varName, varStyle, varPropertyCss, displayStyle) }
    </div>
);

Variable.propTypes = {
    varName: PropTypes.string.isRequired,
    varStyle: PropTypes.string.isRequired,
    varPropertyCss: PropTypes.string.isRequired,
    displayStyle: PropTypes.string.isRequired,
};

export default Variable;
