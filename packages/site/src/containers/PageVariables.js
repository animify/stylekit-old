import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import variableDefs from './../definitions/variables';
import variableGuide from './../../pages/variables/guide.json';
import Variable from '../components/Variable';
import Constants from './../utils/Constants';

export default class PageVariables extends Component {
    state = {
        sections: Utils.buildVariables(variableDefs, variableGuide)
    };

    componentDidMount() {
        const availableVariables = Object.values(this.state.sections).map(variable => ({title: variable.title, id: variable.id}));
        const currentSection = availableVariables.find(v => v.id === this.props.match.params.type);

        this.props.updateNavSections({
            current: currentSection ? currentSection.title : undefined,
            page: 'variables',
            list: availableVariables.map(component => ({
                id: component.id,
                title: component.title,
                pageName: 'variables',
                section: this[component.id]
            }))
        });
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        if (this.props.match.params.type) {
            scrollToComponent(this[this.props.match.params.type], Constants.scrollOptionsPageLoad);
        }
    }

    render() {
        const { title, description } = this.props;
        const { sections } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>{title}</h1>
                        <h3>{description}</h3>
                    </div>

                    {Object.values(sections).map(variable => (
                        <section className="guide" ref={(component) => { this[variable.id] = component; }} key={variable.id}>
                            <div className="guide-description">
                                <h3>{variable.title}</h3>
                                <h4>{variable.description}</h4>
                            </div>
                            <div className="guide-subsection">
                                <div className="row">
                                    { variable.variables.map(v => (<Variable key={v.name} varName={v.name} varCssStyle={v.data} varCssProperty={variable.propertyCss} displayStyle={variable.displayStyle} />)) }
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        );
    }
}

PageVariables.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    guide: PropTypes.string.isRequired
};
