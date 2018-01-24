import React, { Component } from 'react';
import GuideComponents from './../../guides/components.json';

const componentsFolder = './../../../kit/components';


class KitComponents extends Component {
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
                {components.map(example => {
                    return (
                        <section key={example.title}>
                            <div dangerouslySetInnerHTML={{ __html: example.snippet }}>

                            </div>
                            <pre>
                                {example.snippet}
                            </pre>
                        </section>
                    )
                })}
            </section>
        );
    }
}

export default KitComponents;
