import React, { Component } from 'react';
import PropTypes from 'prop-types';
import minicons from 'minicons';
import Navigation from './../components/Navigation';
import PageContainer from './PageContainer';
import PageVariables from './PageVariables';

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
        const { guide } = this.props;

        return (
            <div>
                <Navigation {...this.props} sections={NavSections} />
                {
                    guide === 'variables' ?
                        <PageVariables {...this.props} updateNavSections={this.updateNavSections} /> :
                        <PageContainer {...this.props} updateNavSections={this.updateNavSections} />
                }
            </div>
        );
    }
}

PageLayout.propTypes = {
    guide: PropTypes.string.isRequired
};
