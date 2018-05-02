import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VariableSection extends Component {
    buildByDisplayStyle(varName, varCssStyle) {
        const { section } = this.props;
        const name = varName.split('.').pop();

        switch (section.displayStyle) {
        case 'color':
            return (<div className={['dim', 'snow', 'white'].includes(name) ? 'inner dark' : 'inner'}>
                <div className="style" style={{ backgroundColor: varCssStyle }}>
                    <p className="name">{name}</p>
                    <span className="about">
                        <p className="var">{varName}</p>
                        <p className="hex">{varCssStyle}</p>
                    </span>
                </div>
            </div>);
        case 'text':
            return (<div className="inner">
                <h4 className="style" style={{ [section.propertyCss]: varCssStyle }}>Pack my box with five dozen liquor jugs.</h4>
                <span className="about">
                    <strong>{varName}</strong>
                    <p>{varCssStyle}</p>
                </span>
            </div>);
        case 'shape':
            return (<div className="inner">
                <span className="style" style={{ [section.propertyCss]: varCssStyle }} />
                <span className="about">
                    <strong>{varName}</strong>
                    <p>{varCssStyle}</p>
                </span>
            </div>);
        default:
            return (<span style={{ [section.propertyCss]: varCssStyle }}>
                <p>{varName}</p>
                <p>{varCssStyle}</p>
            </span>);
        }
    }

    render() {
        const { section } = this.props;

        return (
            <section className="guide">
                <div className="guide-description">
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                </div>

                <div className="guide-subsection">
                    <div className="row variable-samples">
                        { section.variables.map(v => (
                            <div className={`variable-sample col-12@t ${section.displayStyle} ${['color', 'shape'].includes(section.displayStyle) ? 'col-12@m' : null}`} key={v.name}>
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
