import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import colorDefinitions from './../definitions/colors';
import typographyDefinitions from './../definitions/typography';
import shadowDefinitions from './../definitions/shadow';
import ColorSample from './../components/ColorSample';
import ShadowSample from './../components/ShadowSample';
import TypographySample from './../components/TypographySample';

export default class KitVariables extends Component {
    constructor() {
        super();

        const colorVariables = Utils.buildColorVariables(colorDefinitions);
        const shadowVariables = Utils.buildShadowVariables(shadowDefinitions);
        const typographyVariables = Utils.buildTypographyVariables(typographyDefinitions);

        this.state = {
            colors: colorVariables,
            shadows: shadowVariables,
            typographies: typographyVariables
        };
    }

    componentDidMount() {
        const types = ['colors', 'shadows', 'typography'];
        const hasTitle = types.includes(this.props.match.params.type);
        this.props.updateNavDropdown({
            current: hasTitle ? Utils.capitalizeFirstLetter(this.props.match.params.type) : undefined,
            list: types.map(component => ({
                name: Utils.capitalizeFirstLetter(component),
                basic: component,
                pageName: 'variables',
                section: this[Utils.cleanString(component)]
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
        const { shadows, colors, typographies } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Variables</h1>
                        <h3>Variables used throughout your stylekit.</h3>
                    </div>
                    <section className="guide" ref={(section) => { this.colors = section; }}>
                        <div className="guide-description">
                            <h3>Colors</h3>
                            <h4>Variables for the colors used throughout the theme style.</h4>
                        </div>
                        <div className="row">
                            {
                                colors.map(color => (
                                    <ColorSample key={color.variable} colorName={color.variable} colorString={color.value.toRgbString()} dark={color.dark} />
                                ))
                            }
                        </div>
                    </section>
                    <section className="guide" ref={(section) => { this.shadows = section; }}>
                        <div className="guide-description">
                            <h3>Shadows</h3>
                            <h4>Variables for the colors used throughout the theme style.</h4>
                        </div>
                        <div className="row">
                            {
                                shadows.map(shadow => (
                                    <ShadowSample key={shadow.variable} shadowName={shadow.variable} shadowCSS={shadow.value} />
                                ))
                            }
                        </div>
                    </section>
                    <section className="guide" ref={(section) => { this.typography = section; }}>
                        <div className="guide-description">
                            <h3>Typography</h3>
                            <h4>Typography.</h4>
                        </div>
                        <div className="row">
                            {
                                typographies.map(typography => (
                                    <TypographySample key={typography.variable} typographyName={typography.variable} typographySize={typography.value} />
                                ))
                            }
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}
