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

    updateNavSections(componentList) {
        this.setState({
            NavSections: componentList
        });
    }

    render() {
        const { NavSections } = this.state;

        return (
            <div>
                <Navigation {...this.props} sections={NavSections} />
                <PageContainer {...this.props} updateNavSections={this.updateNavSections} />
            </div>
        );
    }
}
