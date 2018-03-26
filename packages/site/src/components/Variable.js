import React from 'react';
import PropTypes from 'prop-types';

const buildByDisplayStyle = (varName, varCssProperty, varCssStyle, displayStyle) => {
    switch (displayStyle) {
    case 'color':
        return (<div className="inner">
            <span className="style" style={{ backgroundColor: varCssStyle }} />
            <span className="about">
                <strong>{varName}</strong>
                <small>{varCssStyle}</small>
            </span>
        </div>);
    case 'text':
        return (<div className="inner">
            <h4 className="style" style={{ [varCssProperty]: varCssStyle }}>Pack my box with five dozen liquor jugs.</h4>
            <span className="about">
                <strong>{varName}</strong>
                <small>{varCssStyle}</small>
            </span>
        </div>);
    case 'shape':
        return (<div className="inner">
            <span className="style" style={{ [varCssProperty]: varCssStyle }} />
            <span className="about">
                <strong>{varName}</strong>
                <small>{varCssStyle}</small>
            </span>
        </div>);
    default:
        return (<span style={{ [varCssProperty]: varCssStyle }}>
            <p>{varName}</p>
            <small>{varCssStyle}</small>
        </span>);
    }
};

const Variable = ({ varName, varCssProperty, varCssStyle, displayStyle }) => (
    <div className={`variable-sample col xs-12 ${displayStyle}`}>
        { buildByDisplayStyle(varName, varCssProperty, varCssStyle, displayStyle) }
    </div>
);

Variable.propTypes = {
    varName: PropTypes.string.isRequired,
    varCssStyle: PropTypes.string.isRequired,
    varCssProperty: PropTypes.string.isRequired,
    displayStyle: PropTypes.string.isRequired,
};

export default Variable;
