import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VariableSection extends Component {
    buildByDisplayStyle(varName, varCssStyle) {
        const { section } = this.props;

        switch (section.displayStyle) {
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
                <h4 className="style" style={{ [section.propertyCss]: varCssStyle }}>Pack my box with five dozen liquor jugs.</h4>
                <span className="about">
                    <strong>{varName}</strong>
                    <small>{varCssStyle}</small>
                </span>
            </div>);
        case 'shape':
            return (<div className="inner">
                <span className="style" style={{ [section.propertyCss]: varCssStyle }} />
                <span className="about">
                    <strong>{varName}</strong>
                    <small>{varCssStyle}</small>
                </span>
            </div>);
        default:
            return (<span style={{ [section.propertyCss]: varCssStyle }}>
                <p>{varName}</p>
                <small>{varCssStyle}</small>
            </span>);
        }
    }

    render() {
        const { section } = this.props;

        console.log('rendering', section);

        return (
            <section className="guide">
                <div className="guide-description">
                    <h2>{section.title}</h2>
                    <h5>{section.description}</h5>
                </div>

                <div className="guide-subsection">
                    <div className="row">
                        { section.variables.map(v => (
                            <div className={`variable-sample col-12@t ${section.displayStyle} ${section.displayStyle === 'color' ? 'col-6@m' : null}`} key={v.name}>
                                { this.buildByDisplayStyle(v.name, v.data) }
                            </div>
                        )) }
                    </div>
                </div>
            </section>
        );
    }
}

VariableSection.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        variables: PropTypes.array
    }).isRequired
};
