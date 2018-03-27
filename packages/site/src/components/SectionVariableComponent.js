import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Variable from './Variable';

export default class SectionVariableComponent extends Component {
    toggleSnippet() {
        this.setState({ showingSnippet: !this.state.showingSnippet });
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
                        { section.variables.map(v => (<Variable key={v.name} varName={v.name} varCssStyle={v.data} varCssProperty={section.propertyCss} displayStyle={section.displayStyle} />)) }
                    </div>
                </div>
            </section>
        );
    }
}

SectionVariableComponent.propTypes = {
    section: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        variables: PropTypes.array
    }).isRequired
};
