import React, { Component } from 'react';
import Utils from './../utils/helpers';
import variableDefs from './../definitions/variables';
import variableGuide from './../../pages/variables/guide.json';
import Variable from '../components/Variable';

export default class KitVariables extends Component {
    constructor() {
        super();

        const variables = Utils.buildVariables(variableDefs, variableGuide);

        console.log(variables);
        this.state = {
            variables
        };
    }

    componentDidMount() {
        const types = Object.values(this.state.variables).map(variable => variable.id);
        const hasTitle = types.includes(this.props.match.params.type);
        this.props.updateNavDropdown({
            current: hasTitle ? Utils.capitalizeFirstLetter(this.props.match.params.type) : undefined,
            page: 'variables',
            list: types.map(component => ({
                name: component,
                basic: component,
                pageName: 'variables',
                section: this[component]
            }))
        });
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    render() {
        const { variables } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Variables</h1>
                        <h3>Variables used throughout your stylekit.</h3>
                    </div>

                    {Object.values(variables).map(variable => (
                        <section className="guide" ref={(section) => { this[variable.id] = section; }} key={variable.id}>
                            <div className="guide-description">
                                <h3>{variable.title}</h3>
                                <h4>{variable.description}</h4>
                            </div>
                            <div className="row">
                                { variable.variables.map(v => (<Variable key={v.name} varName={v.name} varStyle={v.data} varPropertyCss={variable.propertyCss} />)) }
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        );
    }
}
