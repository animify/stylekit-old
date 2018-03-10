import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import ComponentSample from './../components/ComponentSample';
import GuideComponents from './../../guides/components.json';
const componentsFolder = './../../../kit/components';
import Nav from './../components/Nav';
import Utils from './../utils/helpers';

export default class KitComponents extends Component {
    constructor() {
        super();

        this.state = {
            components: []
        }
    }

    componentDidMount() {
        this.importComponents();
    }

    buildSubsections(snippet) {
        const subsections = [];
        const sections = snippet.filter('.snippet-section');

        sections.each((i, s) => {
            const section = $(s);
            let trimmedSnippet = null;

            if (sections[i + 1]) {
                trimmedSnippet = section.nextUntil(sections[i + 1]);
            } else {
                trimmedSnippet = section.nextAll();
            }

            const newSubsection = {
                title: section.attr('title'),
                subtitle: section.attr('subtitle'),
                snippet: trimmedSnippet.clone().wrapAll('<div>').parent().html()
            };

            subsections.push(newSubsection);
        });

        return subsections;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    importComponents() {
        const imports = GuideComponents.map(guide => {
            const componentData = { ...guide };

            return new Promise((resolve) => {
                import(`./../../../kit/components/${guide.folder}/snippet.html`)
                    .then((snippet) => {
                        componentData.subsections = this.buildSubsections($(snippet));
                        resolve(componentData);
                    });
            });
        });

        Promise.all(imports)
            .then((components) => {
                this.setState({
                    components
                });

                this.props.updateNav(GuideComponents.map(component => ({
                    title: component.title,
                    folder: component.folder,
                    component: this[Utils.cleanString(component.title)]
                })));
            })
            .catch((e) => {
                console.debug(`Stylekit: Oops, looks like you're missing a snippet file. ${e.message}`);
            });
    }

    render() {
        const { components, list } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Components</h1>
                        <h3>Components do this and that this and that this and that this and that this and that this and that.</h3>
                    </div>
                    {components.map(sample => <ComponentSample ref={(section) => { this[Utils.cleanString(sample.title)] = section; }} key={`sample-${sample.title}`} sample={sample} />)}
                </div>
            </section>
        );
    }
}
