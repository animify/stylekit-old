import React, { Component } from 'react';
import $ from 'jquery';
import ComponentSample from './../components/ComponentSample';
import GuideComponents from './../../guides/components.json';
const componentsFolder = './../../../kit/components';


export default class KitComponents extends Component {
    constructor() {
        super();

        this.state = {
            components: []
        }
    }

    componentDidMount() {
        console.log(GuideComponents);
        this.importComponents();
    }

    buildSubsections(snippet) {
        const subsections = [];

        const firstSection = snippet.first();
        const trimmedSnippet = firstSection.nextUntil('.snippet-section');
        const newSubsection = {
            title: firstSection.attr('title'),
            subtitle: firstSection.attr('subtitle'),
            snippet: trimmedSnippet.wrapAll('<div>').parent().html()
        };

        subsections.push(newSubsection);

        return subsections;
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
               this.setState({ components })
            })
            .catch((e) => {
               console.debug(`Stylekit: Oops, looks like you're missing a snippet file. ${e.message}`);
           });
    }

    render() {
        const { components } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <h1>Components</h1>
                    {components.map(sample => <ComponentSample key={sample.title} sample={sample} />)}
                </div>
            </section>
        );
    }
}
