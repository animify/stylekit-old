import React, { Component } from 'react';
import minicons from 'minicons';
import Navigation from './../components/Navigation';
import Sidebar from './../components/Sidebar';
import PageContainer from './PageContainer';

export default class PageLayout extends Component {
    constructor() {
        super();

        this.state = {
            SectionNames: {
                current: undefined,
                list: []
            }
        };

        this.updateSectionNames = this.updateSectionNames.bind(this);
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

    updateSectionNames(componentList) {
        this.setState({
            SectionNames: componentList
        });
    }

    updateCurrentSection(section) {
        this.pageContainer.setState({ section });
    }

    render() {
        const { SectionNames } = this.state;

        return (
            <section className="container split">
                <Navigation {...this.props} />

                <aside className="sidebar">
                    <Sidebar {...this.props} sections={SectionNames} updateCurrentSection={this.updateCurrentSection} />
                </aside>
                <PageContainer ref={(component) => { this.pageContainer = component; }} {...this.props} updateSectionNames={this.updateSectionNames} />
            </section>

        );
    }
}
