import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import variableDefs from './../definitions/variables';
import variableGuide from './../../pages/variables/guide.json';
import Variable from '../components/Variable';

export default class KitVariables extends Component {
    state = {
        variables: Utils.buildVariables(variableDefs, variableGuide)
    };

    componentDidMount() {
        const types = Object.values(this.state.variables).map(variable => ({title: variable.title, id: variable.id}));
        const hasTitle = types.find(t => t.id === this.props.match.params.type);
        this.props.updateNavDropdown({
            current: hasTitle ? hasTitle.title : undefined,
            page: 'variables',
            list: types.map(component => ({
                name: component.title,
                basic: component.id,
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
            scrollToComponent(this[this.props.match.params.type], { offset: -100, align: 'top', duration: 1 });
        }
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
                            <div className="guide-subsection">
                                <div className="row">
                                    { variable.variables.map(v => (<Variable key={v.name} varName={v.name} varStyle={v.data} varPropertyCss={variable.propertyCss} displayStyle={variable.displayStyle} />)) }
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        );
    }
}
