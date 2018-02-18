import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import colorDefinitions from './../definitions/colors';
import typographyDefinitions from './../definitions/typography';
import shadowDefinitions from './../definitions/shadow';
import ColorSample from './../components/ColorSample';
import ShadowSample from './../components/ShadowSample';
import TypographySample from './../components/TypographySample';

export default class KitDesign extends Component {
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

        this.setFocusedSection = this.setFocusedSection.bind(this);
    }

    componentDidMount() {
        const componentList = ['colors', 'typography'].map(e => (
            <li key={`li-${e}`} className="item"><a onClick={() => this.setFocusedSection(e)} className="capitalize">{e}</a></li>
        ));

        this.props.updateNav(componentList);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    setFocusedSection(section) {
        scrollToComponent(this[section], { offset: -100, align: 'top', duration: 500 });
        this.props.history.replace(`/design/${section}`);
    }

    render() {
        const { shadows, colors, typographies } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Design</h1>
                        <h3>Design does this and that this and that this and that this and that this and that this and that.</h3>
                    </div>
                    <section className="component" ref={(section) => { this.colors = section; }}>
                        <div className="component-description">
                            <h3>Color Variables</h3>
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
                    <section className="component" ref={(section) => { this.colors = section; }}>
                        <div className="component-description">
                            <h3>Shadow Variables</h3>
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
                    <section className="component" ref={(section) => { this.typography = section; }}>
                        <div className="component-description">
                            <h3>Typography Variables</h3>
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
