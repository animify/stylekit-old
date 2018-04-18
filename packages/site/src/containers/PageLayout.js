import React, { Component } from 'react';
import minicons from 'minicons';
import Navigation from './../components/Navigation';
import PageContainer from './PageContainer';

export default class PageLayout extends Component {
    constructor() {
        super();

        this.state = {
            NavSections: {
                current: undefined,
                list: []
            }
        };

        this.updateNavSections = this.updateNavSections.bind(this);
        this.updateCurrentSection = this.updateCurrentSection.bind(this);
    }

    componentWillMount() {
        minicons.setOptions({
            observe: true,
            config: {
                name: 'feedlist-icons',
                props: {
                    stroke: 'rgba(0, 0, 0, .6)'
                }
            }
        });
    }

    componentDidMount() {
        minicons.swap();
    }

    componentDidUpdate() {
        minicons.swap();
    }

    updateNavSections(componentList) {
        this.setState({
            NavSections: componentList
        });
    }

    updateCurrentSection(currentSectionName) {
        this.pageContainer.setState({ currentSectionName });
    }

    render() {
        const { NavSections } = this.state;

        return (
            <section className="container split">
                <aside className="sidebar">
                    <Navigation {...this.props} sections={NavSections} updateCurrentSection={this.updateCurrentSection} />
                </aside>
                <PageContainer ref={(component) => { this.pageContainer = component; }} {...this.props} updateNavSections={this.updateNavSections} />
            </section>

        );
    }
}
