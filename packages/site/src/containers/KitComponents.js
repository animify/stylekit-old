import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import GuideSection from './../components/GuideSection';
import Utils from './../utils/helpers';

export default class KitComponents extends Component {
    state = {
        guides: []
    }

    componentDidMount() {
        Utils.importPage('components', this, this.props.match.params.type);

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.type !== this.props.match.params.type) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        if (this.props.match.params.type) {
            scrollToComponent(this[Utils.cleanString(this.props.match.params.type)], { offset: -100, align: 'top', duration: 1 });
        }
    }

    render() {
        const { guides, list } = this.state;

        return (
            <section className="container">
                <div className="layout">
                    <div className="hero">
                        <h1>Components</h1>
                        <h3>Components do this and that this and that this and that this and that this and that this and that.</h3>
                    </div>
                    {guides.map(sample => <GuideSection ref={(section) => { this[Utils.cleanString(sample.folder)] = section; }} key={`sample-${sample.title}`} sample={sample} />)}
                </div>
            </section>
        );
    }
}
