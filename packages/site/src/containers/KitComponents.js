import React, { Component } from 'react';
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

    importComponents() {
        const imports = GuideComponents.map(guide => {
            const componentData = { ...guide };

            return new Promise((resolve) => {
                import(`./../../../kit/components/${guide.folder}/snippet.html`)
                    .then((snippet) => {
                        componentData.snippet = snippet;
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
                <h1>Components</h1>
                {components.map(sample => <ComponentSample key={sample.title} sample={sample} />)}
            </section>
        );
    }
}
