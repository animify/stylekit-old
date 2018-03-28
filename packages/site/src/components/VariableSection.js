import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VariableSection extends Component {
    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
    }

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

        return (
            <section className="guide">
                <div className="guide-description">
                    <h3>{section.title}</h3>
                    <h4>{section.description}</h4>
                </div>

                <div className="guide-subsection">
                    <div className="row">
                        { section.variables.map(v => (
                            <div className={`variable-sample col xs-12 ${section.displayStyle}`} key={v.name}>
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
