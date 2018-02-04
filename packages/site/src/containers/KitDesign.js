import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import colorDefinitions from './../definitions/colors';
import typographyDefinitions from './../definitions/typography';
import ColorSample from './../components/ColorSample';
import TypographySample from './../components/TypographySample';

export default class KitDesign extends Component {
    constructor() {
        super();

        const colorVariables = Utils.buildColorVariables(colorDefinitions);
        const typographyVariables = Utils.buildTypographyVariables(typographyDefinitions);

        this.state = {
            colors: colorVariables,
            typographies: typographyVariables
        };

        this.setFocusedSection = this.setFocusedSection.bind(this);
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    setFocusedSection(section) {
        scrollToComponent(this[this.cleanString(section.title)], { offset: -100, align: 'top', duration: 500 });
        this.props.updateCurrentComponent(this.capitalizeFirstLetter(section.title));
        this.props.history.replace(`/components/${section.folder}`);
    }

    render() {
        const { colors, typographies } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Design</h1>
                    </div>
                    <section className="component">
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
                    <section className="component">
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
