import React, { Component } from 'react';
import $ from 'jquery';
import scrollToComponent from 'react-scroll-to-component';
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

    componentWillReceiveProps(props) {
        // if (props.match.params.type !== this.props.match.params.type) {
        //     Scroll.scrollTo(100);
        //     // const target = $(`#component-${props.match.params.type.replace(/\s/g, '').toLowerCase()}`);
        //
        //     // if(target.length) {
        //         // console.log('updating');
        //         // $('html, body').animate({
        //         //     scrollTop: target.offset().top - 100
        //         // }, 400);
        //     // }
        // }
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
                console.log();
                this.props.updateNavComponents(GuideComponents.map(c => c.folder));
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
                    <div className="hero">
                        <h1>Components</h1>
                    </div>
                    {components.map(sample => <ComponentSample key={sample.title} sample={sample} />)}
                </div>
            </section>
        );
    }
}
