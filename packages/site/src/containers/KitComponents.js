import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import scrollToComponent from 'react-scroll-to-component';
import ComponentSample from './../components/ComponentSample';
import GuideComponents from './../../guides/components.json';
const componentsFolder = './../../../kit/components';
import Nav from './../components/Nav';

export default class KitComponents extends Component {
    constructor() {
        super();

        this.state = {
            components: [],
            list: []
        }
    }

    cleanString(str) {
        return str.replace(/\s/g, '').toLowerCase();
    }

    componentWillReceiveProps(props) {
        if (props.match.params.type !== this.props.match.params.type) {
            console.log(`component-${this.cleanString(props.match.params.type)}`);

            const element = document.getElementById(`component-button`);
            if (element !== null)
                element.scrollIntoView();
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
                this.setState({
                    components,
                    list: GuideComponents.map(c => c.title)
                })
            })
            .catch((e) => {
                console.debug(`Stylekit: Oops, looks like you're missing a snippet file. ${e.message}`);
            });
    }

    render() {
        const { components, list } = this.state;

        return (
            <section className="container">
                <Nav>
                    <div className="dropdown right">
                        <Link to="/components" className="item active toggle">Components</Link>
                        <ul className="menu">
                            { list.map(e => (
                                <li key={`li-${e}`}><a onClick={() => scrollToComponent(this[this.cleanString(e)], { offset: -100, align: 'top', duration: 500})} className="capitalize">{e}</a></li>
                            )) }
                        </ul>
                    </div>
                </Nav>
                <div className="layout">
                    <div className="hero">
                        <h1>Components</h1>
                    </div>
                    {components.map(sample => <ComponentSample ref={(section) => { this[this.cleanString(sample.title)] = section; }} key={`sample-${sample.title}`} sample={sample} />)}
                </div>
            </section>
        );
    }
}
