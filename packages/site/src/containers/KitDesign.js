import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import scrollToComponent from 'react-scroll-to-component';
import Utils from './../utils/helpers';
import colors from './../definitions/colors';

export default class KitDesign extends Component {
    constructor() {
        super();

        const colorVariables = Utils.buildColorVariables(colors);

        this.state = {
            colors: colorVariables
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
        this.props.history.replace(`/components/${section.folder}`)
    }

    render() {
        const { colors } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Design</h1>
                    </div>
                </div>
            </section>
        );
    }
}
