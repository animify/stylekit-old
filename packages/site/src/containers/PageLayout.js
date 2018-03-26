import React, { Component } from 'react';
import minicons from 'minicons';
import Nav from './../components/Nav';
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

        this.updateNavDropdown = this.updateNavDropdown.bind(this);
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

    updateNavDropdown(componentList) {
        this.setState({
            NavSections: componentList
        });
    }

    render() {
        const { NavSections } = this.state;

        return (
            <div>
                <Nav {...this.props} sections={NavSections} />
                <PageContainer {...this.props} updateNavDropdown={this.updateNavDropdown} />
            </div>
        );
    }
}
